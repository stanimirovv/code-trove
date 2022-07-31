import { IPlayer } from "../../interfaces";
import { Bet } from "../bet";

export class PlayerBehavior {
  public static getDescisionInput() {
    let random = Math.floor(Math.random() * 2) + 1;
    return random === 2 ? "BET" : "LIAR";
  }

  public static makeBet(player: IPlayer) {
    return new Bet(player.name, 2, 3, 5);
  }
}
