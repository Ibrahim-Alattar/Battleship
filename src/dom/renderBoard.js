export function renderBoard(gameboard, container) {
  container.innerHTML = "";

  const cells = gameboard.getCells();

  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      const cell = document.createElement("div");

      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.classList.remove("preview");

      const cellData = cells[row][col];

      if (container.id === "player-board" && cellData.ship) {
        cell.classList.add("ship");
      }

      if (cellData.wasAttacked) {
        if (cellData.ship) {
          cell.classList.add("hit");
        } else {
          cell.classList.add("miss");
        }
      }

      container.appendChild(cell);
    }
  }
}