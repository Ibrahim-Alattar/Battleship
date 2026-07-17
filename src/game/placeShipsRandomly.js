import { Ship } from "../factories/ship.js";

export function placeShipsRandomly(gameboard) {
  const shipLengths = [5, 4, 3, 3, 2];

  for (const length of shipLengths) {
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      const direction =
        Math.random() < 0.5 ? "horizontal" : "vertical";

      placed = gameboard.placeShip(
        Ship(length),
        row,
        col,
        direction
      );
    }
  }
}