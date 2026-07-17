import "./styles.css";

import { GameController } from "./game/gameController.js";
import { renderBoard } from "./dom/renderBoard.js";
import { setupBoardEvent } from "./dom/events.js";
import { placeShipsRandomly } from "./game/placeShipsRandomly.js";
import {
  setupShipPlacement,
  rotateShips,
  resetShipPlacement,
} from "./dom/placeShips.js";

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");

const startBtn = document.getElementById("start-btn");
const rotateBtn = document.getElementById("rotate-btn");
const restartBtn = document.getElementById("restart-btn");
const status = document.getElementById("status");

let game;

function updateUI() {
  renderBoard(game.getPlayer().getBoard(), playerBoard);
  renderBoard(game.getComputer().getBoard(), computerBoard);

  if (game.isGameOver()) {
    status.textContent =
      game.getWinner() === game.getPlayer()
        ? "You win!"
        : "Computer wins!";
  }
}

function startGame() {
  game = GameController();

  resetShipPlacement();

  placeShipsRandomly(game.getComputer().getBoard());

  updateUI();

  status.textContent = "Place your ships";

  startBtn.disabled = true;

  setupShipPlacement(
    playerBoard,
    game,
    updateUI,
    startBtn
  );
}

rotateShips(rotateBtn);

startBtn.addEventListener("click", () => {
  setupBoardEvent(
    computerBoard,
    game,
    updateUI
  );

  status.textContent = "Your turn";

  startBtn.disabled = true;
  rotateBtn.disabled = true;
});

restartBtn.addEventListener("click", () => {
  location.reload();
});

startGame();