import { Ship } from "../src/factories/ship"

test("getLength returns the ship's length", () => {
  const ship = Ship(5)
  expect(ship.getLength()).toBe(5)
})

test("getHits starts at 0", () => {
  const ship = Ship(5)
  expect(ship.getHits()).toBe(0)
})

test("hit increments the hit count", () => {
  const ship = Ship(5)
  ship.hit()
  expect(ship.getHits()).toBe(1)
  ship.hit()
  expect(ship.getHits()).toBe(2)
})

test("isSunk returns false for an unhit ship", () => {
  const ship = Ship(5)
  expect(ship.isSunk()).toBe(false)
})

test("getHits does not exceed the ship's length even after excess hits", () => {
  const ship = Ship(5);

  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.getHits()).toBe(5);
})

test("isSunk returns true once hits equal length", () => {
  const ship = Ship(5)
  ship.hit()
  ship.hit()
  ship.hit()
  ship.hit()
  ship.hit()
  expect(ship.isSunk()).toBe(true)
})