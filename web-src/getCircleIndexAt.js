import nthCircle from './circle';

export default (x, y, canvasWidth, canvasHeight) => {
  const circles = [0, 1, 2, 3, 4].map(i => nthCircle(i, canvasWidth, canvasHeight));

  for (const i in circles) {
    const [cx, cy, cr] = circles[i];

    const dx = cx - x;
    const dy = cy - y;

    if (dx*dx + dy*dy <= cr*cr) {
      return i;
    }
  }

  return -1;
};
