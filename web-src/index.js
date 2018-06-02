import { SinglePlayerNZSCWebInterface } from './nzsc_single_player_web';
import query from './query';
import { canvas, clientToLocalCoords } from './canvas';
import { getRectIndexAt } from './rect';
import renderer from './renderer';
import images from './images';

////////////////
////////////////
////////////////
// Set up constants.
////////////////
////////////////
////////////////

const MAX32 = 2 ** 32 - 1;

const RIGHT_START = -225; // canvas.width / ACCELERATOR



////////////////
////////////////
////////////////
// Cache
////////////////
////////////////
////////////////

let currentOutput = null;
let previousOutput = null;

////////////////
////////////////
////////////////
// Helpers.
////////////////
////////////////
////////////////

const generateSeed = () => (
  query.overrideSeed === null
    ? Math.random() * MAX32
    : query.overrideSeed
);




////////////////
////////////////
////////////////
// Main logic.
////////////////
////////////////
////////////////

const newGame = () => {
  // Setup

  const seed = generateSeed();
  const game = SinglePlayerNZSCWebInterface.new(seed);
  currentOutput = game.initial_output();

  // Listeners

  const characterScreenListener = (e) => {
    const [x, y] = clientToLocalCoords(e.clientX, e.clientY);

    const rectIndex = getRectIndexAt(x, y, canvas.height);

    const { availableCharacters } = JSON.parse(currentOutput.question());

    if (!(rectIndex in availableCharacters)) {
      return;
    }

    const character = availableCharacters[rectIndex];

    previousOutput = currentOutput;
    currentOutput = game.next(character);

    canvas.removeEventListener('click', characterScreenListener);

    // Check to see if computer chose same move as human.
    if (JSON.parse(currentOutput.question()).type === 'CHOOSE_CHARACTER') {
      transitionFromCharacterToCharacterScreen();
    } else {
      transitionFromCharacterToBoosterScreen();
    }
  };

  // Transition-animators

  const transitionFromNothingToCharacterScreen = () => {
    let last = Date.now();
    let t = 0;
    const finishTime = 1000;

    const render = () => {
      const now = Date.now();
      t += now - last;
      last = now;

      if (t > finishTime) {
        t = finishTime;
      }

      renderer.render({
        type: 'NOTHING_TO_CHARACTER',
        availableCharacters: JSON.parse(currentOutput.question()).availableCharacters,
        completionFactor: t / finishTime,
      });

      if (t < finishTime) {
        requestAnimationFrame(render);
      } else {
        canvas.addEventListener('click', characterScreenListener);
      }
    };

    requestAnimationFrame(render);
  };

  const transitionFromCharacterToCharacterScreen = () => {
    let last = Date.now();
    let t = 0;
    const finishTime = 1000;

    const render = () => {
      const now = Date.now();
      t += now - last;
      last = now;

      if (t > finishTime) {
        t = finishTime;
      }

      renderer.render({
        type: 'CHARACTER_TO_CHARACTER',
        previouslyAvailableCharacters: JSON.parse(previousOutput.question()).availableCharacters,
        availableCharacters: JSON.parse(currentOutput.question()).availableCharacters,
        completionFactor: t / finishTime,
      });

      if (t < finishTime) {
        requestAnimationFrame(render);
      } else {
        canvas.addEventListener('click', characterScreenListener);
      }
    };

    requestAnimationFrame(render);
  };

  const transitionFromCharacterToBoosterScreen = () => {
    let last = Date.now();
    let t = 0;
    const finishTime = 1000;

    const render = () => {
      const now = Date.now();
      t += now - last;
      last = now;

      if (t > finishTime) {
        t = finishTime;
      }

      renderer.render({
        type: 'CHARACTER_TO_BOOSTER',
        previouslyAvailableCharacters: JSON.parse(previousOutput.question()).availableCharacters,
        availableBoosters: JSON.parse(currentOutput.question()).availableBoosters,
        completionFactor: t / finishTime,
      });

      if (t < finishTime) {
        requestAnimationFrame(render);
      } else {
        // todo boosterscreenlistener
      }
    };

    requestAnimationFrame(render);
  };

  images.waitForAllToLoad.then(() => {
    transitionFromNothingToCharacterScreen();
  });
};

////////////////
////////////////
////////////////
// Start a game.
////////////////
////////////////
////////////////
newGame();
