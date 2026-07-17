export function Gameboard() {
  const cells = buildCells();
  const ships = [];

  function getPlacementCoordinates(row, col, length, direction) {
    const coords = [];

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        coords.push([row, col + i]);
      } else {
        coords.push([row + i, col]);
      }
    }

    return coords;
  }

  function isValidPlacement(coords) {
    return coords.every(([r, c]) => {
      if (r < 0 || r >= 10 || c < 0 || c >= 10) return false;
      return cells[r][c].ship === null;
    });
  }

  return {
    getCells() {
      return cells;
    },

    placeShip(ship, row, col, direction) {
      const coords = getPlacementCoordinates(
        row,
        col,
        ship.getLength(),
        direction
      );

      if (!isValidPlacement(coords)) return false;

      coords.forEach(([r, c]) => {
        cells[r][c].ship = ship;
      });

      ships.push(ship);

      return true;
    },

    receiveAttack(row, col) {
      const cell = cells[row][col];

      if (cell.wasAttacked) return false;

      cell.wasAttacked = true;

      if (cell.ship) {
        cell.ship.hit();
      }

      return true;
    },

    hasShips() {
      return ships.length > 0;
    },

    areAllShipsSunk() {
      return ships.length > 0 && ships.every((ship) => ship.isSunk());
    },
  };
}

function buildCells() {
  const cells = [];

  for (let i = 0; i < 10; i++) {
    const row = [];

    for (let j = 0; j < 10; j++) {
      row.push({
        ship: null,
        wasAttacked: false,
      });
    }

    cells.push(row);
  }

  return cells;
}