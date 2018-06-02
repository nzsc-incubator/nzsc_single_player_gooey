import { add_one, SinglePlayerNZSCWebInterface } from './nzsc_single_player_web';
import queryString from 'query-string';
import createRenderer from './createRenderer';

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
// If the window gets resized, the canvas will get automatically cleared.
// As a result, we must cache the last output, so we can re-render it when the window is resized.
////////////////
////////////////
////////////////

let cachedOutput = null;

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

  const initialOutput = game.initial_output();
  cachedOutput = initialOutput;

  render(initialOutput);

  // TODO: click/touchend handlers
};

////////////////
////////////////
////////////////
// Start a game.
////////////////
////////////////
////////////////

newGame();
