import { add_one, SinglePlayerNZSCWebInterface } from './nzsc_single_player_web';
import queryString from 'query-string';

////////////////
// Set up constants.
////////////////

const MAX32 = 2 ** 32 - 1;
const ENTER_KEY = 13;

////////////////
// Parse query-string.
////////////////

const parsedQuery = queryString.parse(location.search);

const parsedSeed = parseInt(parsedQuery.seed);
const overrideSeed = isNaN(parsedSeed) || parsedSeed > MAX32
  ? null
  : parsedSeed;

const isAutofocusDisabled = parsedQuery.disable_autofocus === undefined
  ? false
  : (
    parsedQuery.disable_autofocus === null
    || parsedQuery.disable_autofocus.trim() === 'true'
  );

////////////////
// Set up DOM.
////////////////

const container = document.getElementById('terminal-container');
const output = document.getElementById('terminal-output');
const input = document.getElementById('terminal-input');

if (!isAutofocusDisabled) {
  container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    input.focus();
    container.scrollTop = container.scrollHeight;
  }, { passive: false });
}

////////////////
// Helpers.
////////////////

const write = (text) => {
  output.textContent += text;
};

const stringifyOutput = (output) => {
  const questionStr = output.question();
  const notificationsStr = output.notifications().map(n => n + '\n');
  const fullStr = notificationsStr + (notificationsStr.length ? '\n' : '') + questionStr;

  return fullStr;
};

////////////////
// Main logic.
////////////////

const newGame = () => {
  const seed = overrideSeed === null
    ? Math.random() * MAX32
    : overrideSeed;
  const game = SinglePlayerNZSCWebInterface.new(seed);

  const initialOutput = game.initial_output();

  const fullStr = stringifyOutput(initialOutput);
  write(fullStr + '\n\n');

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

        const output = game.next(input.value);
        const fullStr = stringifyOutput(output);
        const isPromptFinal = output.question() === '';

        write(input.value + '\n\n' + fullStr + '\n\n');

        input.value = '';

        input.focus();
        container.scrollTop = container.scrollHeight;

        if (!isPromptFinal) {
          waitForSubmission();
        } else {
          write('\n\nPlay again? y/N\n\n');
          input.focus();
          container.scrollTop = container.scrollHeight;
          waitForPlayAgainResponse();
        }
      }
    };
    input.addEventListener('keypress', listener);
  };

  waitForSubmission();
};

////////////////
// Start a game.
////////////////

newGame();
