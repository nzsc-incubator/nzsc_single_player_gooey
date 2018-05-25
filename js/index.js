import { add_one, SinglePlayerNZSCWebInterface } from './nzsc_single_player_web';

const MAX32 = 2 ** 32 - 1;

const ENTER_KEY = 13;

const container = document.getElementById('terminal-container');
const output = document.getElementById('terminal-output');
const input = document.getElementById('terminal-input');

const write = (text) => {
  output.textContent += text;
};

container.addEventListener('mousedown', () => {
  input.focus();
});

const newGame = () => {
  const game = SinglePlayerNZSCWebInterface.new(Math.random() * MAX32);
  const initialPrompt = game.initial_prompt();
  write(initialPrompt + '\n\n');

  input.focus();
  container.scrollTop = container.scrollHeight;

  const waitForPlayAgainResponse = () => {
    const listener = (e) => {
      if (e.keyCode === ENTER_KEY) {
        input.removeEventListener('keypress', listener);

        write(input.value);

        if (input.value.charAt(0).toLowerCase() === 'y') {
          write('\n\n');
          input.value = '';
          newGame();
        }
      }
    };

    input.addEventListener('keypress', listener);
  };

  const waitForSubmission = () => {
    const listener = (e) => {
      if (e.keyCode === ENTER_KEY) {
        input.removeEventListener('keypress', listener);

        let prompt = game.next(input.value);
        let promptText = prompt.text();
        let isPromptFinal = prompt.is_final();

        write(input.value + '\n\n' + promptText + '\n');

        input.value = '';

        input.focus();
        container.scrollTop = container.scrollHeight;

        if (!isPromptFinal) {
          waitForSubmission();
        } else {
          write('\n\nPlay again? y/N\n\n');
          container.scrollTop = container.scrollHeight;
          waitForPlayAgainResponse();
        }
      }
    };
    input.addEventListener('keypress', listener);
  };

  waitForSubmission();
};

newGame();
