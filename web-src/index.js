import { SinglePlayerNZSCWebInterface } from './nzsc_single_player_web';
import query from './query';
import { canvas, clientToLocalCoords, correctCanvasDimensions } from './canvas';
import { getRectIndexAt } from './rect';
import { getCircleIndexAt } from './circle';
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
let repaint = null;

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

    const rectIndex = getRectIndexAt(x, y);

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

  const boosterScreenListener = (e) => {
    const [x, y] = clientToLocalCoords(e.clientX, e.clientY);

    const rectIndex = getRectIndexAt(x, y);

    const { availableBoosters } = JSON.parse(currentOutput.question());

    if (!(rectIndex in availableBoosters)) {
      return;
    }

    const booster = availableBoosters[rectIndex];

    previousOutput = currentOutput;
    currentOutput = game.next(booster);

    canvas.removeEventListener('click', boosterScreenListener);

    transitionFromBoosterToMoveScreen();
  };

  const moveScreenListener = (e) => {
    const [x, y] = clientToLocalCoords(e.clientX, e.clientY);

    const circleIndex = getCircleIndexAt(x, y);

    const { availableMoves } = JSON.parse(currentOutput.question());

    if (!(circleIndex in availableMoves)) {
      return;
    }

    const move = availableMoves[circleIndex];

    previousOutput = currentOutput;
    currentOutput = game.next(move);

    canvas.removeEventListener('click', moveScreenListener);

    // Check if game is over
    if (JSON.parse(currentOutput.question()).type === 'DONE') {
      transitionToFinalMoveClash();
    } else {
      transitionToMoveClash();
    }
  };

  // Transition-animators

  const transitionFromNothingToCharacterScreen = () => {
    let last = Date.now();
    let t = 0;
    const finishTime = 500;

    const availableCharacters = JSON.parse(currentOutput.question()).availableCharacters;

    repaint = () => {
      renderer.render({
        type: 'NOTHING_TO_CHARACTER',
        availableCharacters,
        completionFactor: 1,
      });
    };

    const render = () => {
      const now = Date.now();
      t += now - last;
      last = now;

      if (t > finishTime) {
        t = finishTime;
      }

      renderer.render({
        type: 'NOTHING_TO_CHARACTER',
        availableCharacters,
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
    const finishTime = 500;

    const previouslyAvailableCharacters = JSON.parse(previousOutput.question()).availableCharacters;
    const availableCharacters = JSON.parse(currentOutput.question()).availableCharacters;

    repaint = () => {
      renderer.render({
        type: 'CHARACTER_TO_CHARACTER',
        previouslyAvailableCharacters,
        availableCharacters,
        completionFactor: 1,
      });
    };

    const render = () => {
      const now = Date.now();
      t += now - last;
      last = now;

      if (t > finishTime) {
        t = finishTime;
      }

      renderer.render({
        type: 'CHARACTER_TO_CHARACTER',
        previouslyAvailableCharacters,
        availableCharacters,
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
    const finishTime = 500;

    const previouslyAvailableCharacters = JSON.parse(previousOutput.question()).availableCharacters;
    const availableBoosters = JSON.parse(currentOutput.question()).availableBoosters;

    repaint = () => {
      renderer.render({
        type: 'CHARACTER_TO_BOOSTER',
        previouslyAvailableCharacters,
        availableBoosters,
        completionFactor: 1,
      });
    };

    const render = () => {
      const now = Date.now();
      t += now - last;
      last = now;

      if (t > finishTime) {
        t = finishTime;
      }

      renderer.render({
        type: 'CHARACTER_TO_BOOSTER',
        previouslyAvailableCharacters,
        availableBoosters,
        completionFactor: t / finishTime,
      });

      if (t < finishTime) {
        requestAnimationFrame(render);
      } else {
        canvas.addEventListener('click', boosterScreenListener);
      }
    };

    requestAnimationFrame(render);
  };

  const transitionFromBoosterToMoveScreen = () => {
    let last = Date.now();
    let t = 0;
    const finishTime = 500;

    const previouslyAvailableBoosters = JSON.parse(previousOutput.question()).availableBoosters;
    const availableMoves = JSON.parse(currentOutput.question()).availableMoves;

    repaint = () => {
      renderer.render({
        type: 'BOOSTER_TO_MOVE',
        previouslyAvailableBoosters,
        availableMoves,
        completionFactor: 1,
      });
    };

    const render = () => {
      const now = Date.now();
      t += now - last;
      last = now;

      if (t > finishTime) {
        t = finishTime;
      }

      renderer.render({
        type: 'BOOSTER_TO_MOVE',
        previouslyAvailableBoosters,
        availableMoves,
        completionFactor: t / finishTime,
      });

      if (t < finishTime) {
        requestAnimationFrame(render);
      } else {
        canvas.addEventListener('click', moveScreenListener);
      }
    };

    requestAnimationFrame(render);
  };

  const transitionToMoveClash = () => {
    let last = Date.now();
    let t = 0;
    const finishTime = 1500;

    const previouslyAvailableMoves = JSON.parse(previousOutput.question()).availableMoves;
    const availableMoves = JSON.parse(currentOutput.question()).availableMoves;

    const moveSelectionAndOutcome = JSON.parse(currentOutput.notifications()).find((notification) => {
      return notification.type === 'MOVE_SELECTION_AND_OUTCOME';
    });
    const score = JSON.parse(currentOutput.notifications()).find((notification) => {
      return notification.type === 'SCORE_UPDATE';
    });

    const { humanMove, computerMove, whoGetsThePoint } = moveSelectionAndOutcome;
    const { humanPoints, computerPoints } = score;

    repaint = () => {
      renderer.render({
        type: 'MOVE_CLASH',
        previouslyAvailableMoves,
        availableMoves,
        humanMove,
        computerMove,
        whoGetsThePoint,
        humanPoints,
        computerPoints,
        completionFactor: 1,
      });
    };

    const render = () => {
      const now = Date.now();
      t += now - last;
      last = now;

      if (t > finishTime) {
        t = finishTime;
      }

      renderer.render({
        type: 'MOVE_CLASH',
        previouslyAvailableMoves,
        availableMoves,
        humanMove,
        computerMove,
        whoGetsThePoint,
        humanPoints,
        computerPoints,
        completionFactor: t / finishTime,
      });

      if (t < finishTime) {
        requestAnimationFrame(render);
      } else {
        canvas.addEventListener('click', moveScreenListener);
      }
    };

    requestAnimationFrame(render);
  };

  const transitionToFinalMoveClash = () => {
    let last = Date.now();
    let t = 0;
    const finishTime = 1500;

    const previouslyAvailableMoves = JSON.parse(previousOutput.question()).availableMoves;

    const moveSelectionAndOutcome = JSON.parse(currentOutput.notifications()).find((notification) => {
      return notification.type === 'MOVE_SELECTION_AND_OUTCOME';
    });
    const score = JSON.parse(currentOutput.notifications()).find((notification) => {
      return notification.type === 'SCORE_UPDATE';
    });

    const { humanMove, computerMove, whoGetsThePoint } = moveSelectionAndOutcome;
    const { humanPoints, computerPoints } = score;

    repaint = () => {
      renderer.render({
        type: 'FINAL_MOVE_CLASH',
        previouslyAvailableMoves,
        humanMove,
        computerMove,
        whoGetsThePoint,
        humanPoints,
        computerPoints,
        completionFactor: 1,
      });
    };

    const render = () => {
      const now = Date.now();
      t += now - last;
      last = now;

      if (t > finishTime) {
        t = finishTime;
      }

      renderer.render({
        type: 'FINAL_MOVE_CLASH',
        previouslyAvailableMoves,
        humanMove,
        computerMove,
        whoGetsThePoint,
        humanPoints,
        computerPoints,
        completionFactor: t / finishTime,
      });

      if (t < finishTime) {
        requestAnimationFrame(render);
      } else {
        //canvas.addEventListener('click', finalScreenListener);
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

window.addEventListener('resize', () => {
  correctCanvasDimensions();

  if (repaint) {
    repaint();
  }
});

newGame();

(function() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
    navigator.serviceWorker.register('./handwritten-sw.js');
  }
})();
