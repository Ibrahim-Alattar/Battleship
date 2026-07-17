import { Player } from "../factories/player.js";
import { ComputerPlayer } from "../factories/ComputerPlayer.js";

export function GameController() {
  const player = Player();
  const computer = ComputerPlayer();

  let currentPlayer = player;

  function switchTurn() {
    currentPlayer =
      currentPlayer === player ? computer : player;
  }

  function isGameOver() {
    return (
      computer.getBoard().areAllShipsSunk() ||
      player.getBoard().areAllShipsSunk()
    );
  }

  function playTurn(row, col) {
    if (isGameOver()) return;

    if (currentPlayer === player) {
      const attacked = player.attack(
        computer.getBoard(),
        row,
        col
      );

      if (!attacked) return;

      if (isGameOver()) return;

      switchTurn();
    }

    if (currentPlayer === computer) {
      const move = computer.generateMove();

      computer.attack(
        player.getBoard(),
        move.row,
        move.col
      );

      if (!isGameOver()) {
        switchTurn();
      }
    }
  }

  function getWinner() {
    if (computer.getBoard().areAllShipsSunk()) {
      return player;
    }

    if (player.getBoard().areAllShipsSunk()) {
      return computer;
    }

    return null;
  }

  function canStart() {
    return (
      player.getBoard().hasShips() &&
      computer.getBoard().hasShips()
    );
  }

  return {
    getPlayer() {
      return player;
    },

    getComputer() {
      return computer;
    },

    getCurrentPlayer() {
      return currentPlayer;
    },

    switchTurn,
    playTurn,
    isGameOver,
    getWinner,
    canStart,
  };
}