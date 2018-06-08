const logoOfCharacter = (character) => {
  switch (character) {
    case 'Ninja': return 'Kick';
    case 'Zombie': return 'Rampage';
    case 'Samurai': return 'Helmet';
    case 'Clown': return 'Nose';
    default: throw new Error('Illegal character: ' + character);
  }
};

const logoOfBooster = (booster) => {
  booster = noSpace(booster);

  switch (booster) {
    case 'Shadow': return 'ShadowSlip';
    case 'Speedy': return 'RunInCircles';
    case 'Regenerative': return 'Regenerate';
    case 'ZombieCorps': return 'ZombieCorps';
    case 'Atlas': return 'Lightning';
    case 'Strong': return 'Bend';
    case 'Backwards': return 'BackwardsMoustachio';
    case 'Moustachio': return 'BigHairyDeal';
    case 'NoBooster': return 'NoBooster';
    default: throw new Error('Illegal booster: ' + booster);
  }
};

const noSpace = str => str.split('').filter(char => char !== ' ').join('');

export {
  logoOfCharacter,
  logoOfBooster,
  noSpace,
};
