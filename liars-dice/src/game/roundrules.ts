import { IPlayer, IRound } from "../interfaces";

export class RoundRules {
  public static getRoundWinner(players: IPlayer[], round: IRound): number {
    const lastBet = round.bets[round.bets.length - 1];

    const defenderIdx = RoundRules.getRoundDefenderIDx(round);
    let matchesDiceCount = round.rolledDice.filter(
      (die) => die === lastBet.dieValue
    ).length;

    // In wild mode, add the 1s to the total count
    if (RoundRules.isWildMode(round)) {
      matchesDiceCount += round.rolledDice.filter((die) => die === 1).length;
    }

    return matchesDiceCount >= lastBet.dieCount
      ? defenderIdx
      : round.callOutPlayerIdx;
  }

  public static isWildMode(round: IRound): boolean {
    return round.bets[0].dieValue !== 1;
  }

  public static getRoundDefenderIDx(round: IRound) {
    return round.callOutPlayerIdx > 0
      ? round.callOutPlayerIdx - 1
      : round.players.length - 1;
  }
}
