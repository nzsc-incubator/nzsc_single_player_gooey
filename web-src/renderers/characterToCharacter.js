import { ctx } from '../canvas';
import { BACKGROUND, OVERLAY } from './helpers/colors';
import { logoOfCharacter } from '../logos';
import images from '../images';
import getBackgroundColorOf from '../getBackgroundColorOf';
import { nthRect } from '../rect';
import { getPhase, getPhaseTime } from '../phases';
import lerp from '../lerp';

const characterToCharacter = ({
  previouslyAvailableCharacters,
  availableCharacters,
  bothCharacter,
  completionFactor,
}) => {
  const PHASE_LENGTHS = [0.15, 0.15, 0.55, 0.15];

  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, 1800, 1000);

  const previouslyAvailableCharacterLogoMoves = previouslyAvailableCharacters.map(logoOfCharacter);
  const availableCharacterLogoMoves = availableCharacters.map(logoOfCharacter);

  const bothCharacterIndex = previouslyAvailableCharacters.findIndex(character => character === bothCharacter);

  if (completionFactor !== 1) {
    for (let i = 0; i < previouslyAvailableCharacterLogoMoves.length; i++) {
      // Don't draw selected human character.
      if (i === bothCharacterIndex) {
        continue;
      }

      ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[i]);

      const rect = nthRect(i);
      const [x, y, w, h] = rect;

      ctx.fillRect(x, y, w, h);

      ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[i]], x, 300, 400, 400);
    }

    ctx.fillStyle = OVERLAY;
    ctx.fillRect(0, 0, 1800, 1000);
  } else {
    for (let i = 0; i < availableCharacterLogoMoves.length; i++) {
      ctx.fillStyle = getBackgroundColorOf(availableCharacterLogoMoves[i]);

      const [x, y, w, h] = nthRect(i);

      ctx.fillRect(x, y, w, h);

      ctx.drawImage(images[availableCharacterLogoMoves[i]], x, 300, 400, 400);
    }
  }

  const phase = getPhase(completionFactor, PHASE_LENGTHS);
  const phaseLength = PHASE_LENGTHS[phase];
  const phaseTime = getPhaseTime(completionFactor, PHASE_LENGTHS);

  switch (phase) {
    case 0: {
      // Draw human character
      const selectedHumanMoveStartRect = nthRect(bothCharacterIndex);
      const selectedHumanMoveEndRect = [200, 100, 600, 800];
      const selectedHumanMoveCurrentRect = selectedHumanMoveStartRect.map((n, i) => lerp(n, selectedHumanMoveEndRect[i], phaseTime / phaseLength));
      const [x, y, w, h] = selectedHumanMoveCurrentRect;

      const imageStartRect = [x, 300, 400, 400];
      const imageEndRect = [200, 200, 600, 600]; //< TODO
      const imageCurrentRect = imageStartRect.map((n, i) => lerp(n, imageEndRect[i], phaseTime / phaseLength));
      const [ix, iy, iw, ih] = imageCurrentRect;

      ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[bothCharacterIndex]);
      ctx.fillRect(x, y, w, h);

      ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[bothCharacterIndex]], ix, iy, iw, ih);

      break;
    }

    case 1: {
      // Draw human character
      {
        const selectedHumanMoveEndRect = [200, 100, 600, 800];
        const [x, y, w, h] = selectedHumanMoveEndRect;

        const imageEndRect = [200, 200, 600, 600]; //< TODO
        const [ix, iy, iw, ih] = imageEndRect;

        ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[bothCharacterIndex]);
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[bothCharacterIndex]], ix, iy, iw, ih);
      }

      // Draw computer character
      const selectedComputerMoveStartRect = [1800, 100, 600, 800];
      const selectedComputerMoveEndRect = [1000, 100, 600, 800];
      const selectedComputerMoveCurrentRect = selectedComputerMoveStartRect.map((n, i) => lerp(n, selectedComputerMoveEndRect[i], phaseTime / phaseLength));
      const [x, y, w, h] = selectedComputerMoveCurrentRect;

      const imageStartRect = [1800, 200, 600, 600]; //< TODO
      const imageEndRect = [1000, 200, 600, 600]; //< TODO
      const imageCurrentRect = imageStartRect.map((n, i) => lerp(n, imageEndRect[i], phaseTime / phaseLength));
      const [ix, iy, iw, ih] = imageCurrentRect;

      ctx.fillStyle = getBackgroundColorOf(logoOfCharacter(bothCharacter));
      ctx.fillRect(x, y, w, h);

      ctx.drawImage(images[logoOfCharacter(bothCharacter)], ix, iy, iw, ih);

      break;
    }

    case 2: {
      // Draw human character
      {
        const selectedHumanMoveEndRect = [200, 100, 600, 800];
        const [x, y, w, h] = selectedHumanMoveEndRect;

        const imageEndRect = [200, 200, 600, 600]; //< TODO
        const [ix, iy, iw, ih] = imageEndRect;

        ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[bothCharacterIndex]);
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[bothCharacterIndex]], ix, iy, iw, ih);
      }

      // Draw computer character
      {
        const selectedComputerMoveEndRect = [1000, 100, 600, 800];
        const [x, y, w, h] = selectedComputerMoveEndRect;

        const imageEndRect = [1000, 200, 600, 600]; //< TODO
        const [ix, iy, iw, ih] = imageEndRect;

        ctx.fillStyle = getBackgroundColorOf(logoOfCharacter(bothCharacter));
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[logoOfCharacter(bothCharacter)], ix, iy, iw, ih);
      }

      break;
    }

    case 3: {
      // Human move exits left
      {
        const x = 200 - 800 * (phaseTime / phaseLength);

        ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[bothCharacterIndex]);
        ctx.fillRect(x, 100, 600, 800);

        ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[bothCharacterIndex]], x, 200, 600, 600);
      }

      // Computer move exits right
      const x = 1000 + 800 * (phaseTime / phaseLength);

      ctx.fillStyle = getBackgroundColorOf(logoOfCharacter(bothCharacter));
      ctx.fillRect(x, 100, 600, 800);

      ctx.drawImage(images[logoOfCharacter(bothCharacter)], x, 200, 600, 600);

      break;
    }
  }
};

export default characterToCharacter;
