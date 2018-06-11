import { ctx } from '../canvas';
import { BACKGROUND } from './helpers/colors';
import { logoOfCharacter } from '../logos';
import images from '../images';
import getBackgroundColorOf from '../getBackgroundColorOf';
import { nthRect } from '../rect';

const characterToCharacter = ({
  previouslyAvailableCharacters,
  availableCharacters,
  completionFactor,
}) => {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, 1800, 1000);

  const previouslyAvailableCharacterLogoMoves = previouslyAvailableCharacters.map(logoOfCharacter);
  const availableCharacterLogoMoves = availableCharacters.map(logoOfCharacter);

  for (let i = 0; i < previouslyAvailableCharacterLogoMoves.length; i++) {
    const rect = nthRect(i);
    const x = rect[0] + 1800 * (0 - completionFactor);
    const [, y, w, h] = rect;

    ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[i]);
    ctx.fillRect(x, y, w, h);

    ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[i]], x, 300, 400, 400);
  }

  for (let i = 0; i < availableCharacterLogoMoves.length; i++) {
    const rect = nthRect(i);
    const x = rect[0] + 1800 * (1 - completionFactor);
    const [, y, w, h] = rect;
    ctx.fillRect(x, y, w, h);

    ctx.drawImage(images[availableCharacterLogoMoves[i]], x, 300, 400, 400);
  }
};

export default characterToCharacter;
