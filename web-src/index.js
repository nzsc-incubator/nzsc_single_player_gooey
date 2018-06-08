import { SinglePlayerNZSCWebInterface } from './nzsc_single_player_web';
import query from './query';
import { correctCanvasDimensions } from './canvas';
import images from './images';
import store from './store';
import { transitionFromNothingToCharacterScreen } from './transitions';

const MAX32 = 2 ** 32 - 1;

const generateSeed = () => (
  query.overrideSeed === null
    ? Math.random() * MAX32
    : query.overrideSeed
);



const newGame = () => {
  const seed = generateSeed();
  const game = SinglePlayerNZSCWebInterface.new(seed);

  store.game = game;
  store.currentOutput = game.initial_output();

  images.waitForAllToLoad.then(() => {
    transitionFromNothingToCharacterScreen();
  });
};



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
