export function setupBoardEvent(board, game, updateUI) {
  board.addEventListener("click", (e) => {
    if (game.isGameOver()) return;

    const cell = e.target.closest(".cell");
    if (!cell) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    const targetCell =
      game.getComputer().getBoard().getCells()[row][col];

    if (targetCell.wasAttacked) return;

    game.playTurn(row, col);

    updateUI();
  });
}