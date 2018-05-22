import { add_one, SinglePlayerNZSCWebInterface } from './nzsc_single_player_web';

const MAX32 = 2147483647;

const ENTER_KEY = 13;

const container = document.getElementById('terminal-container');
const output = document.getElementById('terminal-output');
const input = document.getElementById('terminal-input');

const write = (text) => {
  output.textContent += text;
};

const newGame = () => {
  const game = SinglePlayerNZSCWebInterface.new(Math.random() * MAX32, Math.random() * MAX32);
  const initialPrompt = game.initial_prompt();
  write(initialPrompt + '\n\n');

  const waitForSubmission = () => {
    input.focus();
    container.scrollTop = container.scrollHeight;
    
    const listener = (e) => {
      if (e.keyCode === ENTER_KEY) {
        input.removeEventListener('keypress', listener);

        let prompt = game.next(input.value);

        write(input.value + '\n\n' + prompt + '\n');

        input.value = '';

        if (true) {
          waitForSubmission();
        }
      }
    };
    input.addEventListener('keypress', listener);
  };

  waitForSubmission();
}

newGame();
