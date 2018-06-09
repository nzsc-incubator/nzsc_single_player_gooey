const playButtonCircle = {
  radius: 100,
  color: '#08B',
};

const playButtonTriangle = {
  altitude: 100,
  color: '#EEE',
};

// Calculate triangle vertices
{
  const r = playButtonTriangle.altitude * 2/3;
  const A = Math.PI * 2/3;
  const B = Math.PI * 4/3;

  playButtonTriangle.vertices = [
    [900 + r, 500],
    [900 + Math.cos(A) * r, 500 + Math.sin(A) * r],
    [900 + Math.cos(B) * r, 500 + Math.sin(B) * r]
  ];
}

const isPlayButtonClicked = (x, y) => {
  const [cx, cy, cr] = [900, 500, playButtonCircle.radius];

  const dx = cx - x;
  const dy = cy - y;

  return dx*dx + dy*dy <= cr*cr;
};

export {
  playButtonCircle,
  playButtonTriangle,
  isPlayButtonClicked,
};
