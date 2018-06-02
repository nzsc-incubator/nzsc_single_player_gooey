import box from './box';

// Takes a coordinate and returns the index of a box clicked.
// Or -1 if none is clicked.
export default (x, y, ch) => {
  const hm = box.horizontalMargin;
  const vm = box.verticalMargin;
  const bw = box.width;
  const bh = box.height;

  if (y < vm || y > (ch - vm)) {
    return -1;
  }

  if (((x - hm) % (bw + hm)) > bw) {
    return -1;
  }

  return Math.floor((x - hm) / (bw + hm));
};
