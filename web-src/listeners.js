import {
  transitionFromCharacterToCharacterScreen,
  transitionFromCharacterToBoosterScreen,
  transitionFromBoosterToMoveScreen,
  transitionToMoveClash,
  transitionToFinalMoveClash,
} from './transitions';
import store from './store';
import { canvas, clientToLocalCoords } from './canvas';
import { getRectIndexAt } from './rect';
import { getCircleIndexAt } from './circle';
import { isPlayButtonClicked } from './buttons';
import newGame from './newGame';

const characterScreenListener = (e) => {
  const [x, y] = clientToLocalCoords(e.clientX, e.clientY);

  const rectIndex = getRectIndexAt(x, y);

  const { availableCharacters } = JSON.parse(store.currentOutput.question());

  if (!(rectIndex in availableCharacters)) {
    return;
  }

  const character = availableCharacters[rectIndex];

  store.previousOutput = store.currentOutput;
  store.currentOutput = store.game.next(character);

  canvas.removeEventListener('click', characterScreenListener);

  // Check to see if computer chose same move as human.
  if (JSON.parse(store.currentOutput.question()).type === 'CHOOSE_CHARACTER') {
    transitionFromCharacterToCharacterScreen();
  } else {
    transitionFromCharacterToBoosterScreen();
  }
};

const boosterScreenListener = (e) => {
  const [x, y] = clientToLocalCoords(e.clientX, e.clientY);

  const rectIndex = getRectIndexAt(x, y);

  const { availableBoosters } = JSON.parse(store.currentOutput.question());

  if (!(rectIndex in availableBoosters)) {
    return;
  }

  const booster = availableBoosters[rectIndex];

  store.previousOutput = store.currentOutput;
  store.currentOutput = store.game.next(booster);

  canvas.removeEventListener('click', boosterScreenListener);

  transitionFromBoosterToMoveScreen();
};

const moveScreenListener = (e) => {
  const [x, y] = clientToLocalCoords(e.clientX, e.clientY);

  const circleIndex = getCircleIndexAt(x, y);

  const { availableMoves } = JSON.parse(store.currentOutput.question());

  if (!(circleIndex in availableMoves)) {
    return;
  }

  const move = availableMoves[circleIndex];

  store.previousOutput = store.currentOutput;
  store.currentOutput = store.game.next(move);

  canvas.removeEventListener('click', moveScreenListener);

  // Check if store.game is over
  if (JSON.parse(store.currentOutput.question()).type === 'DONE') {
    transitionToFinalMoveClash();
  } else {
    transitionToMoveClash();
  }
};

const playAgainScreenListener = (e) => {
  const [x, y] = clientToLocalCoords(e.clientX, e.clientY);

  if (!isPlayButtonClicked(x, y)) {
    return;
  }

  newGame();
};

export {
  characterScreenListener,
  boosterScreenListener,
  moveScreenListener,
  playAgainScreenListener,
};
