import { Gameboard } from "../src/factories/gameboard"
import { Ship } from "../src/factories/ship.js"

test("creates a 10x10 grid of cells", () => {
  const board = Gameboard()
  const cells = board.getCells()
  expect(cells.length).toBe(10)
  expect(cells[0].length).toBe(10)
})


test("placeShip assigns the ship to the correct cell", () => {
  const board = Gameboard();
  const ship = Ship(1)
  board.placeShip(ship, 3, 4, 'horizontal');
  expect(board.getCells()[3][4].ship).toBe(ship)
})

test("placeShip places a horizontal ship across consecutive cells", () => {
  const board = Gameboard();
  const ship = Ship(5)
  board.placeShip(ship, 3, 4, 'horizontal');
  expect(board.getCells()[3][4].ship).toBe(ship)
  expect(board.getCells()[3][5].ship).toBe(ship)
  expect(board.getCells()[3][6].ship).toBe(ship)
  expect(board.getCells()[3][7].ship).toBe(ship)
  expect(board.getCells()[3][8].ship).toBe(ship)
})
test("placeShip places a vertical ship across consecutive cells", () => {
  const board = Gameboard();
  const ship = Ship(5)
  board.placeShip(ship, 3, 4, 'vertical');
  expect(board.getCells()[3][4].ship).toBe(ship)
  expect(board.getCells()[4][4].ship).toBe(ship)
  expect(board.getCells()[5][4].ship).toBe(ship)
  expect(board.getCells()[6][4].ship).toBe(ship)
  expect(board.getCells()[7][4].ship).toBe(ship)
})


test("receiveAttack registers a hit on the ship and marks the cell as attacked", () => {
  const board = Gameboard();
  const ship = Ship(1);

  board.placeShip(ship, 3, 4, 'horizontal');
  board.receiveAttack(3, 4);
  expect(board.getCells()[3][4].wasAttacked).toBe(true)

})


test("attack a cell contains a ship", () => {
  const board = Gameboard();
  const ship = Ship(1);

  board.placeShip(ship, 3, 4, 'horizontal');
  board.receiveAttack(3, 4);

  expect(ship.getHits()).toBe(1)
})

test("attack a null cell", () => {
  const board = Gameboard();

  board.receiveAttack(3, 4);
  expect(board.getCells()[3][4].wasAttacked).toBe(true)

})

test("attacking the same cell twice does not hit the ship twice", () => {
  const board = Gameboard();
  const ship = Ship(1);

  board.placeShip(ship, 3, 4, 'horizontal');
  board.receiveAttack(3, 4);
  board.receiveAttack(3, 4);
  board.receiveAttack(3, 4);
  expect(ship.getHits()).toBe(1)
})

test("reports that not all ships are sunk", () => {
  const board = Gameboard();
  const ship = Ship(1);

  board.placeShip(ship, 3, 4, 'horizontal');
  expect(board.areAllShipsSunk()).toBe(false)

})

test("does not place a ship on occupied cells", () => {
  const board = Gameboard();
  const ship1 = Ship(3);
  const ship2 = Ship(2);

  board.placeShip(ship1, 3, 4, "horizontal");

  board.placeShip(ship2, 3, 5, "vertical");

  expect(board.getCells()[4][5].ship).toBe(null);
  expect(board.getCells()[3][5].ship).toBe(ship1);
})

test("refuses to place a horizontal ship that extends beyond the board", () => {
  const board = Gameboard();
  const ship = Ship(5);

  board.placeShip(ship, 3, 8, "horizontal");

  expect(board.getCells()[3][8].ship).toBe(null);
});

test("refuses to place a vertical ship that extends beyond the board", () => {
  const board = Gameboard();
  const ship = Ship(5);

  board.placeShip(ship, 8, 3, "vertical");

  expect(board.getCells()[8][3].ship).toBe(null);
});

test("reports true when all ships are sunk", () => {
  const board = Gameboard();
  const ship = Ship(1);

  board.placeShip(ship, 3, 4, 'horizontal');
  board.receiveAttack(3, 4);

  expect(board.areAllShipsSunk()).toBe(true)
})