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
  const finishTime = 500;

  const previouslyAvailableCharacters = JSON.parse(store.previousOutput.question()).availableCharacters;
  const availableCharacters = JSON.parse(store.currentOutput.question()).availableCharacters;

  store.repaint = () => {
    characterToCharacter({
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

    characterToCharacter({
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
  const finishTime = 2000;

  const previouslyAvailableCharacters = JSON.parse(store.previousOutput.question()).availableCharacters;
  const availableBoosters = JSON.parse(store.currentOutput.question()).availableBoosters;
  const characterSelectionAndHeadstartNotification = JSON.parse(store.currentOutput.notifications())
    .find((notification) => notification.type === 'CHARACTER_SELECTION_AND_HEADSTART');
  const { humanCharacter, computerCharacter, whoGetsTheHeadstart } = characterSelectionAndHeadstartNotification;

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
  const finishTime = 500;

  const previouslyAvailableBoosters = JSON.parse(store.previousOutput.question()).availableBoosters;
  const availableMoves = JSON.parse(store.currentOutput.question()).availableMoves;

  store.repaint = () => {
    boosterToMove({
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

    boosterToMove({
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
