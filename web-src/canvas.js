const canvas = document.getElementById('nzsc-canvas');

const ctx = canvas.getContext('2d');

const DIMENSIONS = {
  width: 1800,
  height: 1000,
};

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

const correctCanvasDimensions = () => {
  sizeCanvas(canvas, DIMENSIONS);
};

correctCanvasDimensions();

const getDimensions = () => {
  return {
    width: canvas.width,
    height: canvas.height,
  };
};

const clientToLocalCoords = (x, y) => {
  const br = canvas.getBoundingClientRect();

  x -= br.left;
  y -= br.top;

  const wFactor = window.innerWidth / canvas.width;
  const hFactor = window.innerHeight / canvas.height;
  const scaleFactor = Math.min(wFactor, hFactor);

  x /= scaleFactor;
  y /= scaleFactor;

  return [x, y];
};

export {
  canvas,
  ctx,
  getDimensions,
  clientToLocalCoords,
  correctCanvasDimensions,
};
