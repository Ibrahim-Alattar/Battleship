import { Player } from "./player.js";

export function ComputerPlayer() {
  const player = Player();
  const previousMoves = [];

  function moveExists(row, col) {
    return previousMoves.some(
      (move) => move.row === row && move.col === col
    );
  }

  return {
    ...player,

    generateMove() {
      let row;
      let col;

      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (moveExists(row, col));

      previousMoves.push({ row, col });

      return { row, col };
    },

    getPreviousMoves() {
      return previousMoves;
    },
  };
}