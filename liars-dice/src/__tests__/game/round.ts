import { Bet } from "../../game/bet";
import { Player } from "../../game/player";
import { Round } from "../../game/round";
import { IBet } from "../../interfaces";

describe("test round creation", () => {
  it("test bet", () => {
    const players = [new Player("Test"), new Player("Test 2")];
    const bets = [new Bet("Test", 1, 3, 2)];
    const round = new Round(players, 0, 1, bets);
  });

  it("test bet", () => {
    const players = [new Player("Test"), new Player("Test 2")];
    const bets: IBet[] = [];
    try {
      const round = new Round(players, -1, 0, bets);
    } catch (err: any) {
      expect(err.toString()).toEqual(
        "Error: A round must have at least a single bet"
      );
    }
  });

  it("test bet wrong current player index", () => {
    const players = [new Player("Test"), new Player("Test 2")];
    const bets = [new Bet("Test", 1, 1, 2)];
    try {
      const round = new Round(players, -1, 0, bets);
    } catch (err: any) {
      expect(err.toString()).toEqual(
        "Error: Current player id is out of boundary"
      );
    }
  });

  it("test bet wrong callout player index", () => {
    const players = [new Player("Test"), new Player("Test 2")];
    const bets = [new Bet("Test", 1, 1, 2)];
    try {
      const round = new Round(players, 0, -1, bets);
    } catch (err: any) {
      expect(err.toString()).toEqual(
        "Error: Callout player id is out of boundary"
      );
    }
  });

  it("test bet wrong minimum number of players", () => {
    const players = [new Player("Test")];
    const bets = [new Bet("Test", 1, 3, 2)];

    expect.assertions(1);

    try {
      const round = new Round(players, 0, 1, bets);
    } catch (err: any) {
      expect(err.toString()).toEqual("Error: Minimum number of players is 2");
    }
  });

  it("test bet wrong maximum number of players", () => {
    const players = [
      new Player("Test"),
      new Player("Test"),
      new Player("Test"),
      new Player("Test"),
      new Player("Test"),
      new Player("Test"),
      new Player("Test"),
      new Player("Test"),
      new Player("Test"),
      new Player("Test"),
      new Player("Test"),
    ];
    const bets = [new Bet("Test", 1, 3, 2)];

    expect.assertions(1);

    try {
      const round = new Round(players, 0, 1, bets);
    } catch (err: any) {
      expect(err.toString()).toEqual("Error: Maximum number of players is 8");
    }
  });
});
