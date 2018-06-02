import { add_one, SinglePlayerNZSCWebInterface } from './nzsc_single_player_web';
import queryString from 'query-string';
import createRenderer from './createRenderer';
import getBoxIndexAt from './getBoxIndexAt';
import getCircleIndexAt from './getCircleIndexAt';
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
// Parse query-string.
////////////////
////////////////
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
////////////////
////////////////
// Cache
////////////////
////////////////
////////////////

let cachedOutput = null;
let cachedLastOutput = null;

////////////////
////////////////
////////////////
// Helpers.
////////////////
////////////////
////////////////

const generateSeed = () => (
  overrideSeed === null
    ? Math.random() * MAX32
    : overrideSeed
);

const sizeCanvas = (canvas, dimensions) => {
  const wFactor = window.innerWidth / dimensions.width;
  const hFactor = window.innerHeight / dimensions.height;
  const scaleFactor = Math.min(wFactor, hFactor);
  const cssWidth = dimensions.width * scaleFactor;
  const cssHeight = dimensions.height * scaleFactor;

  canvas.width = dimensions.width;
  canvas.height = dimensions.height;

  canvas.style.width = cssWidth + 'px';
  canvas.style.height = cssHeight + 'px';

  canvas.style.position = 'fixed';
  canvas.style.left = (window.innerWidth - cssWidth) / 2 + 'px';
  canvas.style.top = (window.innerHeight - cssHeight) / 2 + 'px';
};

////////////////
////////////////
////////////////
// Set up DOM.
////////////////
////////////////
////////////////

const canvas = document.getElementById('nzsc-canvas');

// Sorry WebGL, not today...
const ctx = canvas.getContext('2d');

const render = createRenderer(ctx);

const DIMENSIONS = {
  width: 1800,
  height: 1000,
};

sizeCanvas(canvas, DIMENSIONS);

window.addEventListener('resize', () => {
  sizeCanvas(canvas, DIMENSIONS);

  if (cachedOutput) {
    render(cachedOutput);
  }
});

////////////////
////////////////
////////////////
// Main logic.
////////////////
////////////////
////////////////

const newGame = () => {
  const seed = generateSeed();
  const game = SinglePlayerNZSCWebInterface.new(seed);

  //let output = game.initial_output();
  //cachedOutput = output;
  cachedOutput = game.initial_output();

  const characterSelectionListener = (e) => {
    let x = e.clientX;
    let y = e.clientY;

    const br = canvas.getBoundingClientRect();

    x -= br.left;
    y -= br.top;

    const wFactor = window.innerWidth / canvas.width;
    const hFactor = window.innerHeight / canvas.height;
    const scaleFactor = Math.min(wFactor, hFactor);

    x /= scaleFactor;
    y /= scaleFactor;

    const boxIndex = getBoxIndexAt(x, y, canvas.height);

    const { availableCharacters } = JSON.parse(cachedOutput.question());

    if (!(boxIndex in availableCharacters)) {
      return;
    }

    const character = availableCharacters[boxIndex];

    cachedLastOutput = cachedOutput;
    cachedOutput = game.next(character);

    canvas.removeEventListener('click', characterSelectionListener);

    // Check to see if computer chose same move as human.
    if (JSON.parse(cachedOutput.question()).type === 'CHOOSE_CHARACTER') {
      enterCharacterScreen();
    } else {
      beginCharacterToBoosterTransition();
    }
  };

  const boosterSelectionListener = (e) => {
    let x = e.clientX;
    let y = e.clientY;

    const br = canvas.getBoundingClientRect();

    x -= br.left;
    y -= br.top;

    const wFactor = window.innerWidth / canvas.width;
    const hFactor = window.innerHeight / canvas.height;
    const scaleFactor = Math.min(wFactor, hFactor);

    x /= scaleFactor;
    y /= scaleFactor;

    const boxIndex = getBoxIndexAt(x, y, canvas.height);

    const { availableBoosters } = JSON.parse(cachedOutput.question());

    if (!(boxIndex in availableBoosters)) {
      return;
    }

    const booster = availableBoosters[boxIndex];

    cachedLastOutput = cachedOutput;
    cachedOutput = game.next(booster);

    canvas.removeEventListener('click', boosterSelectionListener);

    beginBoosterToMoveTransition();
  };

  const moveSelectionListener = (e) => {
    let x = e.clientX;
    let y = e.clientY;

    const br = canvas.getBoundingClientRect();

    x -= br.left;
    y -= br.top;

    const wFactor = window.innerWidth / canvas.width;
    const hFactor = window.innerHeight / canvas.height;
    const scaleFactor = Math.min(wFactor, hFactor);

    x /= scaleFactor;
    y /= scaleFactor;

    const circleIndex = getCircleIndexAt(x, y, canvas.width, canvas.height);

    const { availableMoves } = JSON.parse(cachedOutput.question());

    if (!(circleIndex in availableMoves)) {
      return;
    }

    const move = availableMoves[circleIndex];

    cachedLastOutput = cachedOutput;
    cachedOutput = game.next(move);

    canvas.removeEventListener('click', moveSelectionListener);

    alert(move);

    // TODO check for game over

    //showOutcome();
  };

  const enterCharacterScreen = () => {
    let t = RIGHT_START;
    let last = Date.now();

    const tick = () => {
      const now = Date.now();
      const dt = now - last;
      last = now;

      t += dt;

      if (t > 0) {
        t = 0;
      }

      render(cachedOutput, t);

      if (t < 0) {
        requestAnimationFrame(tick);
      } else {
        canvas.addEventListener('click', characterSelectionListener);
      }
    };

    requestAnimationFrame(tick);
  };

  const beginCharacterToBoosterTransition = () => {
    let t = 0;
    let last = Date.now();

    const exitCharacterScreen = () => {
      const now = Date.now();
      const dt = now - last;
      last = now;

      t += dt;

      render(cachedLastOutput, t);

      if (t < 500) {
        requestAnimationFrame(exitCharacterScreen);
      } else {
        t = RIGHT_START;
        requestAnimationFrame(enterBoosterScreen);
      }
    };

    const enterBoosterScreen = () => {
      const now = Date.now();
      const dt = now - last;
      last = now;

      t += dt;

      if (t > 0) {
        t = 0;
      }

      render(cachedOutput, t);

      if (t < 0) {
        requestAnimationFrame(enterBoosterScreen);
      } else {
        canvas.addEventListener('click', boosterSelectionListener);
      }
    };

    requestAnimationFrame(exitCharacterScreen);
  };

  const beginBoosterToMoveTransition = () => {
    let t = 0;
    let last = Date.now();

    const exitBoosterScreen = () => {
      const now = Date.now();
      const dt = now - last;
      last = now;

      t += dt;

      render(cachedLastOutput, t);

      if (t < 500) {
        requestAnimationFrame(exitBoosterScreen);
      } else {
        t = RIGHT_START;
        requestAnimationFrame(enterMoveScreen);
      }
    };

    const enterMoveScreen = () => {
      const now = Date.now();
      const dt = now - last;
      last = now;

      t += dt;

      if (t > 0) {
        t = 0;
      }

      render(cachedOutput, t);

      if (t < 0) {
        requestAnimationFrame(enterMoveScreen);
      } else {
        canvas.addEventListener('click', moveSelectionListener);
      }
    };

    requestAnimationFrame(exitBoosterScreen);
  };

  const showOutcome = () => {
    let t = 0;
    let last = Date.now();

    const escalate = () => {
      const now = Date.now();
      const dt = now - last;
      last = now;

      t += dt;

      //render(cachedLastOutput, t);

      if (t < 500) {
        requestAnimationFrame(escalate);
      } else {
        //t = RIGHT_START?;
        requestAnimationFrame(deescalate);
      }
    };

    const deescalate = () => {
      const now = Date.now();
      const dt = now - last;
      last = now;

      t += dt;

      if (t > 0) {
        t = 0;
      }

      //render(cachedOutput, t);

      if (t < 0) {
        requestAnimationFrame(deescalate);
      } else {
        canvas.addEventListener('click', moveSelectionListener);
      }
    };

    requestAnimationFrame(escalate);
  };

  images.waitForAllToLoad.then(() => {
    enterCharacterScreen();
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
