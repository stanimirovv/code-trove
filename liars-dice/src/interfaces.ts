export interface IRound {
  players: IPlayer[];
  currentPlayerIdx: number;
  callOutPlayerIdx: number;
  bets: IBet[];
  rolledDice: number[];
}

export interface IPlayer {
  name: string;
}

export interface IBet {
  playerName: string;
  dieCount: number;
  dieValue: number;
}
