import { CellState, Field } from "./Field";
import {
  incrementNeighbours,
  getNeighboursItems,
  checkItemInField,
} from "./CellsManipulators";

const { empty, bomb } = CellState;

describe("Check Neighbours selectors", () => {
  it("With [0, 0] coords", () => {
    expect(getNeighboursItems([0, 0])).toStrictEqual({
      top: [-1, 0],
      topRight: [-1, 1],
      right: [0, 1],
      rightBottom: [1, 1],
      bottom: [1, 0],
      bottomLeft: [1, -1],
      left: [0, -1],
      leftTop: [-1, -1],
    });
  });

  it("With [3x3] coords", () => {
    expect(getNeighboursItems([3, 3])).toStrictEqual({
      top: [2, 3],
      topRight: [2, 4],
      right: [3, 4],
      rightBottom: [4, 4],
      bottom: [4, 3],
      bottomLeft: [4, 2],
      left: [3, 2],
      leftTop: [2, 2],
    });
  });
});

describe("Check item in field test", () => {
  describe("Simple Cases", () => {
    const field: Field = [[empty]];

    it("Out of y range", () => {
      expect(checkItemInField([1, 0], field)).toBe(false);
    });

    it("Out of x range", () => {
      expect(checkItemInField([0, -1], field)).toBe(false);
    });

    it("In x and y range", () => {
      expect(checkItemInField([0, 0], field)).toBe(true);
    });
  });

  describe("Big Field", () => {
    const field: Field = [
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
    ];

    it("Out of x range", () => {
      expect(checkItemInField([5, 0], field)).toBe(false);
    });

    it("Out of x range with negative index", () => {
      expect(checkItemInField([-1, 0], field)).toBe(false);
    });

    it("Out of y range", () => {
      expect(checkItemInField([0, 5], field)).toBe(false);
    });

    it("In x and y range", () => {
      expect(checkItemInField([3, 4], field)).toBe(true);
    });
  });
});

describe("Check Increment Neighbours", () => {
  describe("Simple Cases", () => {
    it("Field with only one item", () => {
      expect(incrementNeighbours([0, 0], [[bomb]])).toStrictEqual([[bomb]]);
    });

    it("Field 2x2 with one mine", () => {
      expect(
        incrementNeighbours(
          [0, 0],
          [
            [bomb, empty],
            [empty, empty],
          ]
        )
      ).toStrictEqual([
        [bomb, 1],
        [1, 1],
      ]);
    });

    it("Field 2x2 with two mines", () => {
      expect(
        incrementNeighbours(
          [0, 0],
          [
            [bomb, empty],
            [empty, bomb],
          ]
        )
      ).toStrictEqual([
        [bomb, 1],
        [1, bomb],
      ]);
    });
  });

  describe("3x3 Cases", () => {
    it("Field 3x3 with one centered mine", () => {
      expect(
        incrementNeighbours(
          [1, 1],
          [
            [empty, empty, empty],
            [empty, bomb, empty],
            [empty, empty, empty],
          ]
        )
      ).toStrictEqual([
        [1, 1, 1],
        [1, bomb, 1],
        [1, 1, 1],
      ]);
    });

    it("Field 3x3 with two mines", () => {
      expect(
        incrementNeighbours(
          [1, 1],
          [
            [empty, 1, bomb],
            [empty, bomb, 1],
            [empty, empty, empty],
          ]
        )
      ).toStrictEqual([
        [1, 2, bomb],
        [1, bomb, 2],
        [1, 1, 1],
      ]);
    });
  });

  describe("9x9 cases", () => {
    it("Field 9x9 with 7 mines", () => {
      expect(
        incrementNeighbours(
          [4, 5],
          [
            [9, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 9, 1],
            [0, 0, 1, 9, 1, 0, 2, 2, 2],
            [0, 0, 1, 1, 1, 0, 1, 9, 1],
            [0, 1, 1, 1, 2, 9, 2, 1, 1],
            [0, 1, 9, 2, 1, 1, 0, 0, 0],
            [0, 1, 1, 2, 9, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
          ]
        )
      ).toStrictEqual([
        [9, 1, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 9, 1],
        [0, 0, 1, 9, 1, 0, 2, 2, 2],
        [0, 0, 1, 1, 2, 1, 2, 9, 1],
        [0, 1, 1, 1, 3, 9, 3, 1, 1],
        [0, 1, 9, 2, 2, 2, 1, 0, 0],
        [0, 1, 1, 2, 9, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
    });
  });
});
