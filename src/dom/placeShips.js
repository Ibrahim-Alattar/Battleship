import { Ship } from "../factories/ship.js";

const ships = [5, 4, 3, 3, 2];

let currentShip = 0;
let direction = "horizontal";

export function setupShipPlacement(board, game, updateUI, startBtn) {
  board.addEventListener("mousemove", (e) => {
    board
      .querySelectorAll(".preview")
      .forEach((cell) => cell.classList.remove("preview"));

    if (currentShip >= ships.length) return;

    const cell = e.target.closest(".cell");
    if (!cell) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    const length = ships[currentShip];

    for (let i = 0; i < length; i++) {
      const r = direction === "vertical" ? row + i : row;
      const c = direction === "horizontal" ? col + i : col;

      if (r >= 10 || c >= 10) break;

      const preview = board.querySelector(
        `[data-row="${r}"][data-col="${c}"]`
      );

      if (preview) {
        preview.classList.add("preview");
      }
    }
  });

  board.addEventListener("click", (e) => {
    if (currentShip >= ships.length) return;

    const cell = e.target.closest(".cell");
    if (!cell) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    const placed = game
      .getPlayer()
      .getBoard()
      .placeShip(
        Ship(ships[currentShip]),
        row,
        col,
        direction
      );

    if (!placed) return;

    currentShip++;

    updateUI();

    if (currentShip === ships.length) {
      startBtn.disabled = false;
    }
  });
}

export function rotateShips(button) {
  button.textContent = "Horizontal";

  button.addEventListener("click", () => {
    direction =
      direction === "horizontal"
        ? "vertical"
        : "horizontal";

    button.textContent =
      direction === "horizontal"
        ? "Horizontal"
        : "Vertical";
  });
}

export function resetShipPlacement() {
  currentShip = 0;
  direction = "horizontal";
}