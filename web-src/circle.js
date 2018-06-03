import { getDimensions } from './canvas';

const CIRCLE = {
  radius: 210,
  margin: 100,
};

// Returns an array representing a circle: [x, y, r]
const nthCircle = (n) => {
  const dimensions = getDimensions();
  const w = dimensions.width;
  const h = dimensions.height;
  const r = CIRCLE.radius;
  const m = CIRCLE.margin;

  // Top horizontal margin
  const thm = (w - 6*r - 2*m) / 2;
  // Bottom horizontal margin
  const bhm = (w - 4*r - m) / 2;
  // Vertical margin
  const vm = (h - 4*r -m) / 2;

  const circleCoords = [
    [thm + r, vm + r],
    [thm + 3*r + m, vm + r],
    [thm + 5*r + 2*m, vm + r],
    [bhm + r, vm + 3*r + m],
    [bhm + 3*r + m, vm + 3*r + m]
  ];

  if (!(n in circleCoords)) {
    throw new RangeError('nthCircle() expects 0 <= n <= 4');
  }

  return circleCoords[n].concat([r]);
};

const getCircleIndexAt = (x, y) => {
  const dimensions = getDimensions();
  const circles = [0, 1, 2, 3, 4].map(i => nthCircle(i, dimensions.width, dimensions.height));

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

export {
  nthCircle,
  getCircleIndexAt,
};
