import { SinglePlayerNZSCWebInterface } from './wasm/nzsc_single_player_web';
import query from './query';
import store from './store';
import images from './images';
import { transitionFromNothingToCharacterScreen } from './transitions';

const generateSeed = () => {
  const MAX32 = 2 ** 32 - 1;
  
  return query.overrideSeed === null
    ? Math.random() * MAX32
    : query.overrideSeed;
};

const newGame = () => {
  const game = SinglePlayerNZSCWebInterface.new(generateSeed());

  store.game = game;
  store.previousOutput = null;
  store.currentOutput = game.initial_output();

  images.waitForAllToLoad.then(() => {
    transitionFromNothingToCharacterScreen();
  });
};

export default newGame;
