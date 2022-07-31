import { IPlayer } from "../../interfaces";
import { Bet } from "../bet";

export class AIPlayerBehavior {
  public static isAIPlayer(player: IPlayer) {
    return player.name.startsWith("AI");
  }

  public static makeDescision() {
    let random = Math.floor(Math.random() * 2) + 1;
    return random === 2 ? "BET" : "LIAR";
  }

  public static makeBet(player: IPlayer) {
    return new Bet(player.name, 1, 6, 5);
  }
}
