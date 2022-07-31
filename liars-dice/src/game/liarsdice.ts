import { IBet, IPlayer, IRound } from "../interfaces";
import { AIPlayerBehavior } from "./behaviors/aibehavior";
import { PlayerBehavior } from "./behaviors/playerbehavior";
import { Player } from "./player";
import { Round } from "./round";
import { RoundRules } from "./roundrules";

type AIRoundDescision = "BET" | "LIAR";

export class LiarsDice {
  private _rounds: IRound[] = [];

  // This should be parametrized
  private _players: IPlayer[] = [
    new Player("Player"),
    new Player("AI1"),
    new Player("AI2"),
  ];

  // This should be parametrized
  private _roundsToWin = 3;

  public playGame() {
    let hasWinner = false;
    while (!hasWinner) {
      const currentPlayerIdx = this.getCurrentPlayerIdx();
      let currentPlayer = this._players[currentPlayerIdx];

      let stillBetting = true;
      let bets: IBet[] = [];
      while (stillBetting) {
        // TODO check that bet is valid i.e. bigger than last one
        if (AIPlayerBehavior.isAIPlayer(currentPlayer)) {
          // Handle AI
          const willBet =
            AIPlayerBehavior.makeDescision() === "BET" || bets.length === 0;
          if (willBet) {
            bets.push(AIPlayerBehavior.makeBet(currentPlayer));
          } else {
            stillBetting = false;
          }
        } else {
          // Handle Player
          const willBet =
            PlayerBehavior.getDescisionInput() === "BET" || bets.length === 0;
          if (willBet) {
            bets.push(PlayerBehavior.makeBet(currentPlayer));
          } else {
            stillBetting = false;
          }
        }
      }

      const round = new Round(
        this._players,
        currentPlayerIdx,
        currentPlayerIdx,
        bets
      );

      this._rounds.push(round);

      hasWinner = this.checkForWinner();
      console.log("Player wins!");
    }
  }

  private checkForWinner() {
    const winners = this._rounds.map((round) =>
      RoundRules.getRoundWinner(this._players, round)
    );
    for (let playerIdx = 0; playerIdx < this._players.length; playerIdx++) {
      const playerWins = winners.filter((winner) => winner === playerIdx);
      if (playerWins.length >= this._roundsToWin) {
        return true;
      }
    }
    return false;
  }

  private getCurrentPlayerIdx() {
    if (this._rounds.length === 0) {
      // For the first round, select a random player
      return Math.floor(Math.random() * this._players.length);
    } else {
      const previousRound = this._rounds[this._rounds.length - 1];
      return RoundRules.getRoundWinner(this._players, previousRound);
    }
  }

  constructor() {}
}
