export { default as nothingToCharacter } from './nothingToCharacter';
export { default as characterToCharacter } from './characterToCharacter';
export { default as characterToBooster } from './characterToBooster';
export { default as boosterToMove } from './boosterToMove';
export { default as moveClash } from './moveClash';
export { default as finalMoveClash } from './finalMoveClash';

// TODO transfer snap type specs to respective files
// Snap types:
//
// NOTHING_TO_CHARACTER(availableCharacters, completionFactor)
// CHARACTER_TO_BOOSTER(previouslyAvailableCharacters, availableBoosters, completionFactor)
// CHARACTER_TO_CHARACTER(previouslyAvailableCharacters, availableCharacters, completionFactor)
// BOOSTER_TO_MOVE(previouslyAvailableBoosters, availableMoves, completionFactor)
// MOVE_CLASH(previouslyAvailableMoves, availableMoves, humanMove, computerMove, whoGetsThePoint, humanPoints, computerPoints, completionFactor)
// FINAL_MOVE_CLASH(previouslyAvailableMoves, humanMove, computerMove, whoGetsThePoint, humanPoints, computerPoints, completionFactor)
