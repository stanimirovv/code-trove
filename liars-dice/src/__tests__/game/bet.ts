import { Bet } from "../../game/bet";

describe("Test betting", () => {
  it("test valid bet", () => {
    const bet = new Bet("Test", 2, 3, 5);
    expect(bet.dieCount).toEqual(2);
    expect(bet.dieValue).toEqual(3);
    expect(bet.playerCount).toEqual(5);
    expect(bet.playerName).toEqual("Test");
  });

  it("test invalid Die count", () => {
    expect.assertions(1);
    try {
      const bet = new Bet("Test", -2, 3, 5);
    } catch (error: any) {
      expect(error.toString()).toEqual("Error: Wrong die count -2");
    }
  });

  it("test invalid Die count", () => {
    expect.assertions(1);
    try {
      const bet = new Bet("Test", 100, 3, 5);
    } catch (error: any) {
      expect(error.toString()).toEqual("Error: Wrong die count 100");
    }
  });

  it("test invalid Die value", () => {
    expect.assertions(1);
    try {
      const bet = new Bet("Test", 1, 9, 5);
    } catch (error: any) {
      expect(error.toString()).toEqual("Error: Wrong die value 9");
    }
  });

  it("test invalid Die value", () => {
    expect.assertions(1);
    try {
      const bet = new Bet("Test", 1, 0, 5);
    } catch (error: any) {
      expect(error.toString()).toEqual("Error: Wrong die value 0");
    }
  });
});
