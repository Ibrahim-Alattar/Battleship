import { ComputerPlayer } from "../src/factories/ComputerPlayer.js"
import { Player } from "../src/factories/player.js";
import { Ship } from "../src/factories/ship.js"
test("valid cell generator", () => {
  const computer = ComputerPlayer();

  const { row, col } = computer.generateMove();

  expect(row).toBeGreaterThanOrEqual(0);
  expect(row).toBeLessThanOrEqual(9);

  expect(col).toBeGreaterThanOrEqual(0);
  expect(col).toBeLessThanOrEqual(9);
})


test("ensure that the computer remembers their moves", () => {
  const computer = ComputerPlayer();

  computer.generateMove();

  expect(computer.getPreviousMoves().length).toBe(1);

})

test("prevent pushing moves before verifying it", () => {
  const computer = ComputerPlayer();

  computer.generateMove();

  expect(computer.getPreviousMoves().length).toBe(1);
})


test("ensure there is no duplicates", () => {
  const computer = ComputerPlayer();

  for (let i = 0; i < 100; i++) {
    computer.generateMove();
  }

  expect(computer.getPreviousMoves()).toHaveLength(100);
})

test("computer avoids generating duplicate moves", () => {
  const computer = ComputerPlayer();

  const randomSpy = jest.spyOn(Math, "random")
    .mockReturnValueOnce(0.2) // row = 2
    .mockReturnValueOnce(0.7) // col = 7

    .mockReturnValueOnce(0.2) // duplicate row
    .mockReturnValueOnce(0.7) // duplicate col

    .mockReturnValueOnce(0.5) // new row = 5
    .mockReturnValueOnce(0.9); // new col = 9

  const firstMove = computer.generateMove();
  const secondMove = computer.generateMove();

  expect(firstMove).toEqual({
    row: 2,
    col: 7,
  });

  expect(secondMove).toEqual({
    row: 5,
    col: 9,
  });

  expect(computer.getPreviousMoves()).toHaveLength(2);

  randomSpy.mockRestore();
});
