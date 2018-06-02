import { ctx } from './canvas';
import { nthRect } from './rect';
import { logoOfCharacter, logoOfBooster } from './logos';
import images from './images';

//const ACCELERATOR = 8.0;

const BACKGROUND = '#F1F1F1';
const BOX_BACKGROUND = '#111';
const TEMP_BG = '#111'; // TODO dynamically calculate circle bgcolor based on move

const render = (snap) => {
  switch (snap.type) {
    case 'NOTHING_TO_CHARACTER': {
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, 1800, 1000);

      const characterLogoMoves = snap.availableCharacters.map(logoOfCharacter);

      ctx.fillStyle = BOX_BACKGROUND;

      for (let i = 0; i < characterLogoMoves.length; i++) {
        const rect = nthRect(i);
        const x = rect[0] + 1800 * (1 - snap.completionFactor);
        const [, y, w, h] = rect;
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[characterLogoMoves[i]], x, 300, 400, 400);
      }

      break;
    }

    case 'CHARACTER_TO_BOOSTER': {
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, 1800, 1000);

      const characterLogoMoves = snap.previouslyAvailableCharacters.map(logoOfCharacter);
      const boosterLogoMoves = snap.availableBoosters.map(logoOfBooster);

      ctx.fillStyle = BOX_BACKGROUND;

      for (let i = 0; i < characterLogoMoves.length; i++) {
        const rect = nthRect(i);
        const x = rect[0] + 1800 * (0 - snap.completionFactor);
        const [, y, w, h] = rect;
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[characterLogoMoves[i]], x, 300, 400, 400);
      }

      for (let i = 0; i < boosterLogoMoves.length; i++) {
        const rect = nthRect(i);
        const x = rect[0] + 1800 * (1 - snap.completionFactor);
        const [, y, w, h] = rect;
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[boosterLogoMoves[i]], x, 300, 400, 400);
      }

      break;
    }

    default: console.log('TODO')
  }
};

export default {
  render,
};

// Snap types:
//
// NOTHING_TO_CHARACTER(availableCharacters, completionFactor)
// CHARACTER_TO_BOOSTER(previouslyAvailableCharacters, availableBoosters, completionFactor)
// CHARACTER_TO_CHARACTER(previouslyAvailableCharacters, availableCharacters, completionFactor)
// BOOSTER_TO_MOVE(previouslyAvailableBoosters, availableMoves, completionFactor)
// MOVE_CLASH(previouslyAvailableMoves, availableMoves, selectedMove, opponentMove, completionFactor)
