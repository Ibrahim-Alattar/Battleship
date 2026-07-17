export function renderShips(gameboard, container) {
  const cells = gameboard.getCells();
  const domCells = container.querySelectorAll(".cell");

  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      const index = row * 10 + col;
      const domCell = domCells[index];

      if (cells[row][col].ship) {
        domCell.classList.add("ship");
      } else {
        domCell.classList.remove("ship");
      }
    }
  }
}