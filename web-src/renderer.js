import { ctx } from './canvas';
import { nthRect } from './rect';
import { nthCircle } from './circle';
import lerp from './lerp';
import { getPhase, getPhaseTime } from './phases';
import { logoOfCharacter, logoOfBooster, noSpace } from './logos';
import images from './images';

//const ACCELERATOR = 8.0;

const BACKGROUND = '#F1F1F1';
const BOX_BACKGROUND = '#111';
const TEMP_BG = '#111'; // TODO dynamically calculate circle bgcolor based on move
const OVERLAY = '#333A';

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

    case 'BOOSTER_TO_MOVE': {
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, 1800, 1000);

      const boosterLogoMoves = snap.previouslyAvailableBoosters.map(logoOfBooster);
      const availableMoves = snap.availableMoves.map(noSpace);

      ctx.fillStyle = BOX_BACKGROUND;

      for (let i = 0; i < boosterLogoMoves.length; i++) {
        const rect = nthRect(i);
        const x = rect[0] + 1800 * (0 - snap.completionFactor);
        const [, y, w, h] = rect;
        ctx.fillRect(x, y, w, h);

        ctx.drawImage(images[boosterLogoMoves[i]], x, 300, 400, 400);
      }

      ctx.fillStyle = TEMP_BG;

      for (let i = 0; i < availableMoves.length; i++) {
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

      break;
    }

    case 'MOVE_CLASH': {
      // This animation is divided into 5 phases:
      //
      // 0. Grow - Human move circle expands from starting position into end position.
      // 1. Oppose - Computer move circle enters from the right and moves to the end position.
      // 2. Clash - One, none, or both of the circles disappears.
      // 3. Exit - Human move circle exits left, computer move circle exits right. Overlay is removed.

      // This is the amount of time apportioned to each phase:
      const PHASE_LENGTHS = [0.15, 0.15, 0.55, 0.15];

      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, 1800, 1000);

      const previouslyAvailableMoves = snap.previouslyAvailableMoves.map(noSpace);
      const availableMoves = snap.availableMoves.map(noSpace);

      const selectedHumanMoveIndex = previouslyAvailableMoves.findIndex(move => move === noSpace(snap.humanMove));

      if (snap.completionFactor !== 1) {
        ctx.fillStyle = TEMP_BG;

        for (let i = 0; i < previouslyAvailableMoves.length; i++) {
          // Don't draw selected human move.
          if (i === selectedHumanMoveIndex) {
            continue;
          }

          const circle = nthCircle(i);
          const x = circle[0];
          const [, y, r] = circle;
          const d = 2 * r;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          ctx.fill();
          ctx.closePath();

          ctx.drawImage(images[previouslyAvailableMoves[i]], x - r, y - r, d, d);
        }

        ctx.fillStyle = OVERLAY;
        ctx.fillRect(0, 0, 1800, 1000);
      } else {
        ctx.fillStyle = TEMP_BG;

        for (let i = 0; i < availableMoves.length; i++) {
          const circle = nthCircle(i);
          const x = circle[0];
          const [, y, r] = circle;
          const d = 2 * r;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          ctx.fill();
          ctx.closePath();

          ctx.drawImage(images[availableMoves[i]], x - r, y - r, d, d);
        }
      }

      ctx.fillStyle = TEMP_BG;

      const phase = getPhase(snap.completionFactor, PHASE_LENGTHS);
      const phaseLength = PHASE_LENGTHS[phase];
      const phaseTime = getPhaseTime(snap.completionFactor, PHASE_LENGTHS);

      switch (phase) {
        case 0: {
          // Draw human move
          const selectedHumanMoveStartCircle = nthCircle(selectedHumanMoveIndex);
          const selectedHumanMoveEndCircle = [490, 500, 360];
          const selectedHumanMoveCurrentCircle = selectedHumanMoveStartCircle.map((n, i) => lerp(n, selectedHumanMoveEndCircle[i], phaseTime / phaseLength));

          const x = selectedHumanMoveCurrentCircle[0];
          const [, y, r] = selectedHumanMoveCurrentCircle;
          const d = 2 * r;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          ctx.fill();
          ctx.closePath();

          ctx.drawImage(images[noSpace(snap.humanMove)], x - r, y - r, d, d);

          break;
        }

        case 1: {
          // Draw human move
          {
            const selectedHumanMoveEndCircle = [490, 500, 360];

            const x = selectedHumanMoveEndCircle[0];
            const [, y, r] = selectedHumanMoveEndCircle;
            const d = 2 * r;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            ctx.drawImage(images[noSpace(snap.humanMove)], x - r, y - r, d, d);
          }

          // Draw computer move
          const selectedComputerMoveStartCircle = [1800, 500, 360];
          const selectedComputerMoveEndCircle = [1310, 500, 360];

          const selectedComputerMoveCurrentCircle = selectedComputerMoveStartCircle.map((n, i) => lerp(n, selectedComputerMoveEndCircle[i], phaseTime / phaseLength));
          const x = selectedComputerMoveCurrentCircle[0];
          const [, y, r] = selectedComputerMoveCurrentCircle;
          const d = 2 * r;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          ctx.fill();
          ctx.closePath();

          ctx.drawImage(images[noSpace(snap.computerMove)], x - r, y - r, d, d);

          break;
        }

        case 2: {
          // Draw human move
          console.log(snap.whoGetsThePoint, snap.humanMove, snap.computerMove);
          const FADE_RATE = 5;

          {
            if (snap.whoGetsThePoint === 'COMPUTER' || snap.whoGetsThePoint === 'BOTH') {
              ctx.globalAlpha = lerp(1, 0, Math.min(phaseTime * FADE_RATE, 1));
            }

            const selectedHumanMoveEndCircle = [490, 500, 360];

            const x = selectedHumanMoveEndCircle[0];
            const [, y, r] = selectedHumanMoveEndCircle;
            const d = 2 * r;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            ctx.drawImage(images[noSpace(snap.humanMove)], x - r, y - r, d, d);

            ctx.globalAlpha = 1;
          }

          // Draw computer move
          {
            if (snap.whoGetsThePoint === 'HUMAN' || snap.whoGetsThePoint === 'BOTH') {
              ctx.globalAlpha = lerp(1, 0, Math.min(phaseTime * FADE_RATE, 1));
            }

            const selectedComputerMoveEndCircle = [1310, 500, 360];

            const x = selectedComputerMoveEndCircle[0];
            const [, y, r] = selectedComputerMoveEndCircle;
            const d = 2 * r;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            ctx.drawImage(images[noSpace(snap.computerMove)], x - r, y - r, d, d);

            ctx.globalAlpha = 1;
          }

          break;
        }

        case 3: {
          if (!(snap.whoGetsThePoint === 'COMPUTER' || snap.whoGetsThePoint === 'BOTH')) {
            const selectedHumanMoveEndCircle = [490, 500, 360];

            const x = selectedHumanMoveEndCircle[0] - 850 * (phaseTime / phaseLength);
            const [, y, r] = selectedHumanMoveEndCircle;
            const d = 2 * r;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            ctx.drawImage(images[noSpace(snap.humanMove)], x - r, y - r, d, d);
          }

          // Draw computer move
          if (!(snap.whoGetsThePoint === 'HUMAN' || snap.whoGetsThePoint === 'BOTH')) {
            const selectedComputerMoveEndCircle = [1310, 500, 360];

            const x = selectedComputerMoveEndCircle[0] + 850 * (phaseTime / phaseLength);
            const [, y, r] = selectedComputerMoveEndCircle;
            const d = 2 * r;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            ctx.drawImage(images[noSpace(snap.computerMove)], x - r, y - r, d, d);
          }

          break;
        }
      }

      break;
    }

    default: console.log('TODO: ' + snap.type)
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
// MOVE_CLASH(previouslyAvailableMoves, availableMoves, humanMove, computerMove, whoGetsThePoint, completionFactor)
// FINAL_MOVE_CLASH(previouslyAvailableMoves, humanMove, computerMove, whoGetsThePoint, humanPoints, computerPoints, completionFactor)
