import { IBet, IPlayer, IRound } from "../interfaces";

export class Round implements IRound {
  private _bets: IBet[];
  private _callOutPlayerIdx: number;
  private _currentPlayerIdx: number;
  private _players: IPlayer[];
  private _rolledDice: number[];

  constructor(
    players: IPlayer[],
    currentPlayerIdx: number,
    callOutPlayerIdx: number,
    bets: IBet[]
  ) {
    if (bets.length < 1) {
      throw new Error("A round must have at least a single bet");
    }

    if (currentPlayerIdx < 0 || currentPlayerIdx > players.length) {
      throw new Error("Current player id is out of boundary");
    }
    if (callOutPlayerIdx < 0 || callOutPlayerIdx > players.length) {
      throw new Error("Callout player id is out of boundary");
    }

    if (players.length < 2) {
      throw new Error("Minimum number of players is 2");
    }

    if (players.length > 8) {
      throw new Error("Maximum number of players is 8");
    }

    this._rolledDice = this.rollDice(players.length);
    this._players = players;
    this._bets = bets;
    this._currentPlayerIdx = currentPlayerIdx;
    this._callOutPlayerIdx = callOutPlayerIdx;
  }

  private rollDice(playerCount: number) {
    const diceRolls = [];
    for (let i = 0; i < playerCount * 5; i++) {
      diceRolls.push(Math.floor((Math.random() % 6) * 10));
    }
    return diceRolls;
  }

  public get rolledDice() {
    return this._rolledDice;
  }

  public set rolledDice(dice: number[]) {
    this._rolledDice = dice;
  }

  public get bets(): IBet[] {
    return this._bets;
  }
  public set bets(v: IBet[]) {
    this._bets = v;
  }

  public get callOutPlayerIdx(): number {
    return this._callOutPlayerIdx;
  }
  public set callOutPlayerIdx(v: number) {
    this._callOutPlayerIdx = v;
  }

  public get currentPlayerIdx(): number {
    return this._currentPlayerIdx;
  }
  public set currentPlayerIdx(v: number) {
    this._currentPlayerIdx = v;
  }

  public get players(): IPlayer[] {
    return this._players;
  }
  public set players(v: IPlayer[]) {
    this._players = v;
  }
}
