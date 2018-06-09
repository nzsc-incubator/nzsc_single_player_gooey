import { correctCanvasDimensions } from './canvas';
import store from './store';
import newGame from './newGame';

newGame();

window.addEventListener('resize', () => {
  correctCanvasDimensions();
  if (store.repaint) {
    store.repaint();
  }
});

(function() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
})();
