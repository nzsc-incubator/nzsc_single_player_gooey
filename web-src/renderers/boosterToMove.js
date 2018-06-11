import { ctx } from '../canvas';
import { BACKGROUND } from './helpers/colors';
import { logoOfBooster, noSpace } from '../logos';
import images from '../images';
import getBackgroundColorOf from '../getBackgroundColorOf';
import { nthRect } from '../rect';
import { nthCircle } from '../circle';

const boosterToMove = (snap) => {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, 1800, 1000);

  const boosterLogoMoves = snap.previouslyAvailableBoosters.map(logoOfBooster);
  const availableMoves = snap.availableMoves.map(noSpace);

  for (let i = 0; i < boosterLogoMoves.length; i++) {
    const rect = nthRect(i);
    const x = rect[0] + 1800 * (0 - snap.completionFactor);
    const [, y, w, h] = rect;

    ctx.fillStyle = getBackgroundColorOf(boosterLogoMoves[i]);
    ctx.fillRect(x, y, w, h);

    ctx.drawImage(images[boosterLogoMoves[i]], x, 300, 400, 400);
  }

  for (let i = 0; i < availableMoves.length; i++) {
    ctx.fillStyle = getBackgroundColorOf(availableMoves[i]);

    const circle = nthCircle(i);
    const x = circle[0] + 1800 * (1 - snap.completionFactor);
    const [, y, r] = circle;
    const d = 2 * r;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.drawImage(images[availableMoves[i]], x - r, y - r, d, d);
  }
};

export default boosterToMove;
