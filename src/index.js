import './styles.css';
import { Ship } from './factories/ship.js';
import { Gameboard } from './factories/gameboard.js';
import { GameController } from './game/gameController.js';

const game = GameController();

const ship = Ship(1);
game.getComputer().getBoard().placeShip(ship, 3, 4, "horizontal");

game.playTurn(3, 4);

console.log(game.getComputer().getBoard().areAllShipsSunk());
console.log(game.getWinner());