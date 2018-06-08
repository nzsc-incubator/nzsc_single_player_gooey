import { noSpace } from './logos';

const colors = {
  '#111': `
    NoBooster
    Kick
    Nunchucks
    ShadowFireball
    RunInCircles
    LightningFastKarateChop
    Rampage
    Muscle
    Zap
    Gravedigger
    ZombieCorps
    Apocalypse
    Helmet
    Smash
    Lightning
    Earthquake
    Nose
    NoseOfTheTaunted
  `.trim().split('\n').map(str => str.trim()),

  '#ddd': `
    NinjaSword
    ShadowSlip
    Regenerate
    SamuraiSword
    Twist
    Bend
    AcidSpray
    MustacheMash
    BigHairyDeal
  `.trim().split('\n').map(str => str.trim()),
  '#888': `
    BackwardsMoustachio
    JugglingKnives
  `.trim().split('\n').map(str => str.trim()),
};

export default (moveName) => {
  for (const color in colors) {
    if (colors[color].includes(noSpace(moveName))) {
      return color;
    }
  }

  throw new TypeError(moveName + ' has no defined background color!');
};
