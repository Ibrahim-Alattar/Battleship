import { Player } from "../factories/player.js"
import { ComputerPlayer } from "../factories/ComputerPlayer.js"

export function GameController() {
  const player = Player()
  const computer = ComputerPlayer()

  let currentPlayer = player


  return {
    getPlayer() {
      return player
    },
    getComputer() {
      return computer
    },
    getCurrentPlayer() {
      return currentPlayer;
    },
    switchTurn() {
      currentPlayer =
        currentPlayer === player ? computer : player;
    },
    playTurn(row, col) {
      if (currentPlayer === player) {
        currentPlayer.attack(computer.getBoard(), row, col);
      } else {
        const move = computer.generateMove();
        computer.attack(player.getBoard(), move.row, move.col);
      }
    },
    isGameOver() {
      return computer.getBoard().areAllShipsSunk() || player.getBoard().areAllShipsSunk()
    },
    getWinner() {
      if (player.getBoard().areAllShipsSunk()) return computer;
      if (computer.getBoard().areAllShipsSunk()) return player;

      return null;
    },
    canStart() {
      return player.getBoard().hasShips() &&
        computer.getBoard().hasShips();
    }
  }
}