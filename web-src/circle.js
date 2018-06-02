const circle = {
  radius: 210,
  margin: 100,
};

// Returns an array representing a circle: [x, y, r]
const nthCircle = (n, canvasWidth, canvasHeight) => {
  const w = canvasWidth;
  const h = canvasHeight;
  const r = circle.radius;
  const m = circle.margin;

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
}

export default nthCircle;
