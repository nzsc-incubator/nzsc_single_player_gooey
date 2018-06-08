import { getDimensions } from './canvas';

const RECT = {
  width: 400,
  height: 800,
  horizontalMargin: 40,
  verticalMargin: 100,
};

// Returns an array representing a rectangle: [x, y, w, h]
const nthRect = (n) => {
  if (n < 0 || n > 3) {
    throw new RangeError('nthRect() requires 0 <= n <= 3');
  }

  const hm = RECT.horizontalMargin;
  const vm = RECT.verticalMargin;
  const bw = RECT.width;
  const bh = RECT.height;

  const x = hm + n * (400 + hm);
  return [x, vm, bw, bh];
};

// Takes a coordinate and returns the index of a box clicked.
// Or -1 if none is clicked.
const getRectIndexAt = (x, y) => {
  const hm = RECT.horizontalMargin;
  const vm = RECT.verticalMargin;
  const bw = RECT.width;

  if (y < vm || y > (getDimensions().height - vm)) {
    return -1;
  }

  if (((x - hm) % (bw + hm)) > bw) {
    return -1;
  }

  return Math.floor((x - hm) / (bw + hm));
};

export {
  nthRect,
  getRectIndexAt,
};
