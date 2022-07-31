import { Bet } from "../../game/bet";
import { RoundRules } from "../../game/liarsdice";
import { Player } from "../../game/player";
import { Round } from "../../game/round";

describe("Test round rules", () => {
  it("test defender wins", () => {
    const players = [new Player("Test 1"), new Player("Test 2")];
    const bets = [new Bet("Test 1", 2, 4, 2)];
    const round = new Round(players, 1, 1, bets);
    const rounds = [round];
    round.rolledDice = [4, 4, 1, 1, 1, 1, 1];

    expect(RoundRules.getRoundWinner(players, rounds)).toEqual(0);
  });

  it("test defender wins, more dice than needed", () => {
    const players = [new Player("Test 1"), new Player("Test 2")];
    const bets = [new Bet("Test 1", 2, 4, 2)];
    const round = new Round(players, 1, 1, bets);
    const rounds = [round];
    round.rolledDice = [4, 4, 4, 1, 1, 1, 1];

    expect(RoundRules.getRoundWinner(players, rounds)).toEqual(0);
  });

  it("test defender wins wild mode", () => {
    const players = [new Player("Test 1"), new Player("Test 2")];
    const bets = [new Bet("Test 1", 4, 4, 2)];
    const round = new Round(players, 1, 1, bets);
    const rounds = [round];
    round.rolledDice = [4, 2, 2, 1, 1, 1, 1];

    expect(RoundRules.getRoundWinner(players, rounds)).toEqual(0);
  });

  it("test attacker wins", () => {
    const players = [new Player("Test 1"), new Player("Test 2")];
    const bets = [new Bet("Test 1", 7, 4, 2)];
    const round = new Round(players, 1, 1, bets);
    const rounds = [round];
    round.rolledDice = [4, 4, 4, 2, 2, 2, 2];

    expect(RoundRules.getRoundWinner(players, rounds)).toEqual(1);
  });

  it("test attacker wins disable wild mode", () => {
    const players = [new Player("Test 1"), new Player("Test 2")];
    const bets = [new Bet("Test 1", 4, 1, 2), new Bet("Test 1", 4, 4, 2)];
    const round = new Round(players, 1, 1, bets);
    const rounds = [round];
    round.rolledDice = [4, 4, 4, 1, 2, 2, 2];

    expect(RoundRules.getRoundWinner(players, rounds)).toEqual(1);
  });
});
