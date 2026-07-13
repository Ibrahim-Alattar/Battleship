import { Gameboard } from './gameboard.js'
export function Player() {
  const board = Gameboard()
  return {
    getBoard() {
      return board
    },
    attack(enemy, row, col) {
      return enemy.receiveAttack(row, col)
    }
  }
}
