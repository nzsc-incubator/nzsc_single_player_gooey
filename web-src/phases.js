const getPhase = (t, phaseLengths) => {
  let boundary = 0;

  for (let phase = 0; phase < phaseLengths.length; phase++) {
    const phaseLength = phaseLengths[phase];
    boundary += phaseLength;
    if (t <= boundary) {
      return phase;
    }
  }

  throw new RangeError(t + ' is not in a phase!');
};

const getPhaseTime = (t, phaseLengths) => {
  let boundary = 0;

  for (let phase = 0; phase < phaseLengths.length; phase++) {
    const phaseLength = phaseLengths[phase];
    boundary += phaseLength;
    if (t <= boundary) {
      return t - (boundary - phaseLength);
    }
  }

  throw new RangeError(t + ' is not in a phase!');
};

export {
  getPhase,
  getPhaseTime,
};
