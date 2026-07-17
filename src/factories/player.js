import { Gameboard } from "./gameboard.js";

export function Player() {
  const board = Gameboard();

  return {
    getBoard() {
      return board;
    },

    attack(enemyBoard, row, col) {
      return enemyBoard.receiveAttack(row, col);
    },
  };
}