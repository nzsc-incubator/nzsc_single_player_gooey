import { SinglePlayerNZSCWebInterface } from './nzsc_single_player_web';
import query from './query';
import { correctCanvasDimensions } from './canvas';
import images from './images';
import store from './store';
import { transitionFromNothingToCharacterScreen } from './transitions';

////////////////
////////////////
////////////////
// Set up constants.
////////////////
////////////////
////////////////

const MAX32 = 2 ** 32 - 1;

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
  const seed = generateSeed();
  const game = SinglePlayerNZSCWebInterface.new(seed);
  
  store.game = game;
  store.currentOutput = game.initial_output();

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

  if (store.repaint) {
    store.repaint();
  }
});

newGame();

(function() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
})();
