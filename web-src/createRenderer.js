import Kick from './images/Kick.png';
import NinjaSword from './images/NinjaSword.png';
import Nunchucks from './images/Nunchucks.png';
import Rampage from './images/Rampage.png'
import Muscle from './images/Muscle.png'
import Zap from './images/Zap.png'
import SamuraiSword from './images/SamuraiSword.png'
import Helmet from './images/Helmet.png'
import Smash from './images/Smash.png'
import JugglingKnives from './images/JugglingKnives.png'
import AcidSpray from './images/AcidSpray.png'
import Nose from './images/Nose.png'

const BACKGROUND = '#CCC';
const CHARACTER_BACKGROUND = '#111';

const createRenderer = (ctx) => (output) => {
  const question = JSON.parse(output.question());
  const notifications = JSON.parse(output.notifications());

  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, 1800, 1000);

  const srcs = [Kick, Rampage, Helmet, Nose];
  ctx.fillStyle = CHARACTER_BACKGROUND;
  const MARGIN = 40;
  for (let i = 0; i < 4; i++) {
    const x = MARGIN + i * (400 + MARGIN);
    ctx.fillRect(x, 100, 400, 800);

    const img = new Image();
    img.src = srcs[i];
    ctx.drawImage(img, x, 300, 400, 400);
  }
};

export default createRenderer;
