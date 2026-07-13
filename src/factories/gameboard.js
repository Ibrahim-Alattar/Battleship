export function Gameboard() {
  const cells = buildCells()
  const ships = []

  // Helper: Generates an array of [r, c] pairs for the ship's intended path
  function getPlacementCoordinates(row, col, length, direction) {
    const coords = []
    for (let i = 0; i < length; i++) {
      if (direction === 'horizontal') {
        coords.push([row, col + i])
      } else if (direction === 'vertical') {
        coords.push([row + i, col])
      }
    }
    return coords
  }

  // Helper: Validates if ALL generated coordinates are safe to use
  function isValidPlacement(coords) {
    return coords.every(([r, c]) => {
      // 1. Check boundaries (0-9 for a 10x10 board)
      if (r < 0 || r > 9 || c < 0 || c > 9) return false
      // 2. Check for overlapping ships
      return cells[r][c].ship === null
    })
  }

  return {
    getCells() {
      return cells
    },

    placeShip(ship, row, col, direction) {
      const coords = getPlacementCoordinates(row, col, ship.getLength(), direction)

      if (!isValidPlacement(coords)) return;

      // If valid, execute the placement loop cleanly
      coords.forEach(([r, c]) => {
        cells[r][c].ship = ship
      })

      ships.push(ship)
    },

    receiveAttack(row, col) {
      if (cells[row][col].wasAttacked) { return; }
      cells[row][col].wasAttacked = true
      if (cells[row][col].ship === null) { return; }
      cells[row][col].ship.hit();
    },

    areAllShipsSunk() {
      // Bonus refactor: using array.every makes this a clean one-liner
      return ships.every(ship => ship.isSunk())
    }
  }
}

function buildCells() {
  const cells = []
  for (let i = 0; i < 10; i++) {
    const row = []
    for (let j = 0; j < 10; j++) {
      row.push({ ship: null, wasAttacked: false })
    }
    cells.push(row)
  }
  return cells
}