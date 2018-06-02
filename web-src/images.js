import Kick from './images/Kick.png';
import NinjaSword from './images/NinjaSword.png';
import Nunchucks from './images/Nunchucks.png';
import Rampage from './images/Rampage.png';
import Muscle from './images/Muscle.png';
import Zap from './images/Zap.png';
import SamuraiSword from './images/SamuraiSword.png';
import Helmet from './images/Helmet.png';
import Smash from './images/Smash.png';
import JugglingKnives from './images/JugglingKnives.png';
import AcidSpray from './images/AcidSpray.png';
import Nose from './images/Nose.png';

import Placeholder from './images/Placeholder.png';

/*
TODO other images
*/

const srcs = {Kick, NinjaSword, Nunchucks, Rampage, Muscle, Zap, SamuraiSword, Helmet, Smash, JugglingKnives, AcidSpray, Nose, Placeholder};

const imageLoadPromises = [];

const images = Object.keys(srcs).reduce((obj, srcKey) => {
  const img = new Image();
  img.src = srcs[srcKey];

  imageLoadPromises.push(new Promise((resolve, reject) => {
    img.addEventListener('load', () => {
      resolve();
    });
  }));

  return {
    ...obj,
    [srcKey]: img,
  };
}, {});

images.ShadowFireball = images.Placeholder;
images.ShadowSlip = images.Placeholder;
images.LightningFastKarateChop = images.Placeholder;
images.RunInCircles = images.Placeholder;
images.ZombieCorps = images.Placeholder;
images.Apocalypse = images.Placeholder;
images.Regenerate = images.Placeholder;
images.Gravedigger = images.Placeholder;
images.Lightning = images.Placeholder;
images.Earthquake = images.Placeholder;
images.Bend = images.Placeholder;
images.Twist = images.Placeholder;
images.BackwardsMoustachio = images.Placeholder;
images.NoseOfTheTaunted = images.Placeholder;
images.BigHairyDeal = images.Placeholder;
images.MustacheMash = images.Placeholder;

images.waitForAllToLoad = Promise.all(imageLoadPromises);

export default images;
