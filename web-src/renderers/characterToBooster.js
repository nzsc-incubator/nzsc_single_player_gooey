import { ctx } from '../canvas';
import { BACKGROUND, OVERLAY, SCORE_COLOR } from './helpers/colors';
import { logoOfCharacter, logoOfBooster } from '../logos';
import images from '../images';
import getBackgroundColorOf from '../getBackgroundColorOf';
import { nthRect } from '../rect';
import { getPhase, getPhaseTime } from '../phases';
import lerp from '../lerp';

const characterToBooster = ({
  previouslyAvailableCharacters,
  availableBoosters,
  humanCharacter,
  computerCharacter,
  whoGetsTheHeadstart,
  completionFactor,
}) => {
  const PHASE_LENGTHS = [0.15, 0.15, 0.55, 0.15];

  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, 1800, 1000);

  const previouslyAvailableCharacterLogoMoves = previouslyAvailableCharacters.map(logoOfCharacter);
  const availableBoosterLogoMoves = availableBoosters.map(logoOfBooster);

  const humanCharacterIndex = previouslyAvailableCharacters.findIndex(character => character === humanCharacter);

  if (completionFactor !== 1) {
    for (let i = 0; i < previouslyAvailableCharacterLogoMoves.length; i++) {
      // Don't draw selected human character.
      if (i === humanCharacterIndex) {
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
    for (let i = 0; i < availableBoosterLogoMoves.length; i++) {
      ctx.fillStyle = getBackgroundColorOf(availableBoosterLogoMoves[i]);

      const [x, y, w, h] = nthRect(i);

      ctx.fillRect(x, y, w, h);

      ctx.drawImage(images[availableBoosterLogoMoves[i]], x, 300, 400, 400);
    }

    /* TODO: find a way to draw scores without blocking boosters
    ctx.fillStyle = SCORE_COLOR;

    if (whoGetsTheHeadstart === 'HUMAN') {
      ctx.fillRect(100, 850, 20, 100);
    }
    if (whoGetsTheHeadstart === 'COMPUTER') {
      ctx.fillRect(1700, 850, 20, 100);
    }
    */
  }

  const phase = getPhase(completionFactor, PHASE_LENGTHS);
  const phaseLength = PHASE_LENGTHS[phase];
  const phaseTime = getPhaseTime(completionFactor, PHASE_LENGTHS);

  switch (phase) {
    case 0: {
      // Draw human character
      const selectedHumanMoveStartRect = nthRect(humanCharacterIndex);
      const selectedHumanMoveEndRect = [200, 100, 600, 800];
      const selectedHumanMoveCurrentRect = selectedHumanMoveStartRect.map((n, i) => lerp(n, selectedHumanMoveEndRect[i], phaseTime / phaseLength));
      const [x, y, w, h] = selectedHumanMoveCurrentRect;

      const imageStartRect = [x, 300, 400, 400];
      const imageEndRect = [200, 200, 600, 600]; //< TODO
      const imageCurrentRect = imageStartRect.map((n, i) => lerp(n, imageEndRect[i], phaseTime / phaseLength));
      const [ix, iy, iw, ih] = imageCurrentRect;

      ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[humanCharacterIndex]);
      ctx.fillRect(x, y, w, h);

      ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[humanCharacterIndex]], ix, iy, iw, ih);

      break;
    }

    case 1: {
      // Draw human character
      {
        const selectedHumanMoveEndRect = [200, 100, 600, 800];
        const [x, y, w, h] = selectedHumanMoveEndRect;

        const imageEndRect = [200, 200, 600, 600]; //< TODO
        const [ix, iy, iw, ih] = imageEndRect;

        ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[humanCharacterIndex]);
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[humanCharacterIndex]], ix, iy, iw, ih);
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

      ctx.fillStyle = getBackgroundColorOf(logoOfCharacter(computerCharacter));
      ctx.fillRect(x, y, w, h);

      ctx.drawImage(images[logoOfCharacter(computerCharacter)], ix, iy, iw, ih);

      break;
    }

    case 2: {
      // Draw human character
      const FADE_RATE = 5;

      {
        if (whoGetsTheHeadstart === 'COMPUTER') {
          ctx.globalAlpha = lerp(1, 0, Math.min(phaseTime * FADE_RATE, 1));
        }

        const selectedHumanMoveEndRect = [200, 100, 600, 800];
        const [x, y, w, h] = selectedHumanMoveEndRect;

        const imageEndRect = [200, 200, 600, 600]; //< TODO
        const [ix, iy, iw, ih] = imageEndRect;

        ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[humanCharacterIndex]);
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[humanCharacterIndex]], ix, iy, iw, ih);

        ctx.globalAlpha = 1;
      }

      // Draw computer move
      {
        if (whoGetsTheHeadstart === 'HUMAN') {
          ctx.globalAlpha = lerp(1, 0, Math.min(phaseTime * FADE_RATE, 1));
        }

        const selectedComputerMoveEndRect = [1000, 100, 600, 800];
        const [x, y, w, h] = selectedComputerMoveEndRect;

        const imageEndRect = [1000, 200, 600, 600]; //< TODO
        const [ix, iy, iw, ih] = imageEndRect;

        ctx.fillStyle = getBackgroundColorOf(logoOfCharacter(computerCharacter));
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[logoOfCharacter(computerCharacter)], ix, iy, iw, ih);

        ctx.globalAlpha = 1;
      }

      break;
    }

    case 3: {
      // Human move exits left
      if (whoGetsTheHeadstart !== 'COMPUTER') {
        const x = 200 - 800 * (phaseTime / phaseLength);

        ctx.fillStyle = getBackgroundColorOf(previouslyAvailableCharacterLogoMoves[humanCharacterIndex]);
        ctx.fillRect(x, 100, 600, 800);

        ctx.drawImage(images[previouslyAvailableCharacterLogoMoves[humanCharacterIndex]], x, 200, 600, 600);
      }

      // Computer move exits right
      if (whoGetsTheHeadstart !== 'HUMAN') {
        const x = 1000 + 800 * (phaseTime / phaseLength);

        ctx.fillStyle = getBackgroundColorOf(logoOfCharacter(computerCharacter));
        ctx.fillRect(x, 100, 600, 800);

        ctx.drawImage(images[logoOfCharacter(computerCharacter)], x, 200, 600, 600);
      }

      break;
    }
  }
};

export default characterToBooster;
