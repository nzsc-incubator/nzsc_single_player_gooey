import { ctx } from '../canvas';
import { BACKGROUND } from './helpers/colors';
import { logoOfCharacter, logoOfBooster } from '../logos';
import images from '../images';
import getBackgroundColorOf from '../getBackgroundColorOf';
import { nthRect } from '../rect';

const characterToBooster = (snap) => {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, 1800, 1000);

  const characterLogoMoves = snap.previouslyAvailableCharacters.map(logoOfCharacter);
  const boosterLogoMoves = snap.availableBoosters.map(logoOfBooster);

  for (let i = 0; i < characterLogoMoves.length; i++) {
    const rect = nthRect(i);
    const x = rect[0] + 1800 * (0 - snap.completionFactor);
    const [, y, w, h] = rect;

    ctx.fillStyle = getBackgroundColorOf(characterLogoMoves[i]);
    ctx.fillRect(x, y, w, h);

    ctx.drawImage(images[characterLogoMoves[i]], x, 300, 400, 400);
  }

  for (let i = 0; i < boosterLogoMoves.length; i++) {
    const rect = nthRect(i);
    const x = rect[0] + 1800 * (1 - snap.completionFactor);
    const [, y, w, h] = rect;

    ctx.fillStyle = getBackgroundColorOf(boosterLogoMoves[i]);
    ctx.fillRect(x, y, w, h);

    ctx.drawImage(images[boosterLogoMoves[i]], x, 300, 400, 400);
  }
};

export default characterToBooster;
