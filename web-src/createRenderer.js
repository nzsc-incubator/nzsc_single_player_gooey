import images from './images';
import box from './box';
import nthCircle from './circle';
import { logoOfCharacter, logoOfBooster, noSpace } from './logos';

const BACKGROUND = '#F1F1F1';
const BOX_BACKGROUND = '#111';
const TEMP_BG = '#111'; // TODO dynamically calculate circle bgcolor based on move

const ACCELERATOR = 8.0; // Makes animations faster

const hm = box.horizontalMargin;
const bw = box.width;
const bh = box.height;

const createRenderer = (ctx) => (output, t = 0) => {
  const question = JSON.parse(output.question());
  const notifications = JSON.parse(output.notifications());

  switch (question.type) {
    case 'CHOOSE_CHARACTER':
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, 1800, 1000);

      const logoMoves = question.availableCharacters.map(logoOfCharacter);
      ctx.fillStyle = BOX_BACKGROUND;

      for (let i = 0; i < 4; i++) {
        const x = hm + i * (400 + hm) - (t * ACCELERATOR);
        ctx.fillRect(x, 100, bw, bh);

        ctx.drawImage(images[logoMoves[i]], x, 300, 400, 400);

        /*const img = new Image();
        img.src = srcs[i];
        img.addEventListener('load', () => {
          ctx.drawImage(img, x, 300, 400, 400);
        });*/
      }
      break;
    case 'CHOOSE_BOOSTER':
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, 1800, 1000);

      const boosterLogoMoves = question.availableBoosters.map(logoOfBooster);
      ctx.fillStyle = BOX_BACKGROUND;

      for (let i = 0; i < boosterLogoMoves.length; i++) {
        const x = hm + i * (400 + hm) - (t * ACCELERATOR);
        ctx.fillRect(x, 100, bw, bh);
        ctx.drawImage(images[boosterLogoMoves[i]], x, 300, 400, 400);

        /*const img = new Image();
        img.src = srcs[i];
        img.addEventListener('load', () => {
          ctx.drawImage(img, x, 300, 400, 400);
        });*/
      }
      break;
    case 'CHOOSE_MOVE':
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, 1800, 1000);

      const availableMoves = question.availableMoves.map(noSpace);

      ctx.fillStyle = TEMP_BG;
      for (let i = 0; i < availableMoves.length; i++) {
        const circle = nthCircle(i, ctx.canvas.width, ctx.canvas.height);
        const cx = circle[0] - (t * ACCELERATOR);
        const [, cy, cr] = circle;
        const cd = 2 * cr;

        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, 2* Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(images[availableMoves[i]], cx - cr, cy - cr, cd, cd);
      }

      break;
  }
};

export default createRenderer;
