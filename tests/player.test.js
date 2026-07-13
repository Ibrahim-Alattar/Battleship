import { Player } from "../src/factories/player.js"
import { Ship } from "../src/factories/ship.js"
test("creates a player with its own gameboard", () => {
  const player = Player()
  expect(player.getBoard()).toBeDefined()
})

test("player attacks an enemy board", () => {
  const player = Player();
  const enemy = Player();

  player.attack(enemy.getBoard(), 3, 4);

  expect(enemy.getBoard().getCells()[3][4].wasAttacked).toBe(true);
});


test("player attacks an enemy's ship", () => {
  const player = Player();
  const enemy = Player();
  const ship = Ship(2)
  enemy.getBoard().placeShip(ship, 3, 4, "horizontal")

  player.attack(enemy.getBoard(), 3, 4);
  player.attack(enemy.getBoard(), 3, 5);

  expect(enemy.getBoard().areAllShipsSunk()).toBe(true);
})