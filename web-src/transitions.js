import {
  characterScreenListener,
  boosterScreenListener,
  moveScreenListener,
  playAgainScreenListener,
} from './listeners';
import store from './store';
import {
  nothingToCharacter,
  characterToCharacter,
  characterToBooster,
  boosterToMove,
  moveClash,
  finalMoveClash,
} from './renderers/index';
import { canvas } from './canvas';

const transitionFromNothingToCharacterScreen = () => {
  let last = Date.now();
  let t = 0;
  const finishTime = 500;

  const availableCharacters = JSON.parse(store.currentOutput.question()).availableCharacters;

  store.repaint = () => {
    nothingToCharacter({
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

    nothingToCharacter({
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
  const finishTime = 2000;

  const previouslyAvailableCharacters = JSON.parse(store.previousOutput.question()).availableCharacters;
  const availableCharacters = JSON.parse(store.currentOutput.question()).availableCharacters;
  const { bothCharacter } = JSON.parse(store.currentOutput.notifications())
    .find((notification) => notification.type === 'SAME_CHARACTER_SELECTION');

  store.repaint = () => {
    characterToCharacter({
      previouslyAvailableCharacters,
      availableCharacters,
      bothCharacter,
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

    characterToCharacter({
      previouslyAvailableCharacters,
      availableCharacters,
      bothCharacter,
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
  const finishTime = 2000;

  const previouslyAvailableCharacters = JSON.parse(store.previousOutput.question()).availableCharacters;
  const availableBoosters = JSON.parse(store.currentOutput.question()).availableBoosters;
  const characterSelectionAndHeadstartNotification = JSON.parse(store.currentOutput.notifications())
    .find((notification) => notification.type === 'CHARACTER_SELECTION_AND_HEADSTART');
  const { humanCharacter, computerCharacter, whoGetsTheHeadstart } = characterSelectionAndHeadstartNotification;
  // We'll need this later to show the initial score, at the end of boosterToMove.
  store.cachedHeadstart = whoGetsTheHeadstart;

  store.repaint = () => {
    characterToBooster({
      previouslyAvailableCharacters,
      availableBoosters,
      humanCharacter,
      computerCharacter,
      whoGetsTheHeadstart,
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

    characterToBooster({
      previouslyAvailableCharacters,
      availableBoosters,
      humanCharacter,
      computerCharacter,
      whoGetsTheHeadstart,
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
  const finishTime = 2000;

  const previouslyAvailableBoosters = JSON.parse(store.previousOutput.question()).availableBoosters;
  const availableMoves = JSON.parse(store.currentOutput.question()).availableMoves;
  const { humanBooster, computerBooster } = JSON.parse(store.currentOutput.notifications())
    .find((notification) => notification.type === 'BOOSTER_SELECTION');
  const [humanPoints, computerPoints] = store.cachedHeadstart === 'HUMAN'
    ? [1, 0]
    : store.cachedHeadstart === 'COMPUTER'
      ? [0, 1]
      : [0, 0];

  store.repaint = () => {
    boosterToMove({
      previouslyAvailableBoosters,
      availableMoves,
      humanBooster,
      computerBooster,
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

    boosterToMove({
      previouslyAvailableBoosters,
      availableMoves,
      humanBooster,
      computerBooster,
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

const transitionToMoveClash = () => {
  let last = Date.now();
  let t = 0;
  const finishTime = 1500;

  const previouslyAvailableMoves = JSON.parse(store.previousOutput.question()).availableMoves;
  const availableMoves = JSON.parse(store.currentOutput.question()).availableMoves;

  const moveSelectionAndOutcome = JSON.parse(store.currentOutput.notifications()).find((notification) => {
    return notification.type === 'MOVE_SELECTION_AND_OUTCOME';
  });
  const score = JSON.parse(store.currentOutput.notifications()).find((notification) => {
    return notification.type === 'SCORE_UPDATE';
  });

  const { humanMove, computerMove, whoGetsThePoint } = moveSelectionAndOutcome;
  const { humanPoints, computerPoints } = score;

  store.repaint = () => {
    moveClash({
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

    moveClash({
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

  const previouslyAvailableMoves = JSON.parse(store.previousOutput.question()).availableMoves;

  const moveSelectionAndOutcome = JSON.parse(store.currentOutput.notifications()).find((notification) => {
    return notification.type === 'MOVE_SELECTION_AND_OUTCOME';
  });
  const score = JSON.parse(store.currentOutput.notifications()).find((notification) => {
    return notification.type === 'SCORE_UPDATE';
  });

  const { humanMove, computerMove, whoGetsThePoint } = moveSelectionAndOutcome;
  const { humanPoints, computerPoints } = score;

  store.repaint = () => {
    finalMoveClash({
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

    finalMoveClash({
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
      canvas.addEventListener('click', playAgainScreenListener);
    }
  };

  requestAnimationFrame(render);
};

export {
  transitionFromNothingToCharacterScreen,
  transitionFromCharacterToCharacterScreen,
  transitionFromCharacterToBoosterScreen,
  transitionFromBoosterToMoveScreen,
  transitionToMoveClash,
  transitionToFinalMoveClash,
};
