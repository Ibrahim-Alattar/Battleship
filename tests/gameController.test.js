import { GameController } from "../src/game/gameController";
import { Ship } from "../src/factories/ship.js"
test("creates a game with two players", () => {
  const game = GameController();

  expect(game.getPlayer()).toBeDefined();
  expect(game.getComputer()).toBeDefined();
});


test("the human player starts the game", () => {
  const game = GameController();

  expect(game.getCurrentPlayer()).toBe(game.getPlayer());
});

test("switches turns between players", () => {
  const game = GameController();

  game.switchTurn();

  expect(game.getCurrentPlayer()).toBe(game.getComputer());

  game.switchTurn();

  expect(game.getCurrentPlayer()).toBe(game.getPlayer());
});

test("playTurn tells the current player to attack", () => {
  const game = GameController();

  game.playTurn(3, 4);

  expect(
    game.getComputer().getBoard().getCells()[3][4].wasAttacked
  ).toBe(true);
});

test("computer attacks the player's board on its turn", () => {
  const game = GameController();

  jest.spyOn(game.getComputer(), "generateMove").mockReturnValue({
    row: 3,
    col: 4,
  });

  game.switchTurn();

  game.playTurn();

  expect(
    game.getPlayer().getBoard().getCells()[3][4].wasAttacked
  ).toBe(true);
});

test("playTurn ends the game when all enemy ships are sunk", () => {
  const game = GameController();

  const ship = Ship(1);
  game.getComputer().getBoard().placeShip(ship, 3, 4, "horizontal");

  game.playTurn(3, 4);

  expect(game.isGameOver()).toBe(true);
});

test("returns the player as the winner when the computer's ships are sunk", () => {
  const game = GameController();
  const playerShip = Ship(1);
  game.getPlayer().getBoard().placeShip(playerShip, 0, 0, "horizontal");

  const computerShip = Ship(1);
  game.getComputer().getBoard().placeShip(computerShip, 3, 4, "horizontal");

  game.playTurn(3, 4);

  expect(game.getWinner()).toBe(game.getPlayer());
});