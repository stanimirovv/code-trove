import { IBet } from "../interfaces";

export class Bet implements IBet {
  private _playerName: string;
  private _playerCount: number;
  private _dieCount: number;
  private _dieValue: number;

  constructor(
    playerName: string,
    dieCount: number,
    dieValue: number,
    playerCount: number
  ) {
    if (!this.isValidDieCount(dieCount, playerCount)) {
      throw new Error(`Wrong die count ${dieCount}`);
    }

    if (!this.isValidDieValue(dieValue)) {
      throw new Error(`Wrong die value ${dieValue}`);
    }

    this._dieCount = dieCount;
    this._dieValue = dieValue;
    this._playerName = playerName;
    this._playerCount = playerCount;
  }

  private isValidDieCount(dieCount: number, playerCount: number): boolean {
    const diceOnTheBoard = playerCount * 5;
    if (dieCount < 1 || dieCount > diceOnTheBoard) {
      return false;
    }

    return true;
  }

  private isValidDieValue(dieValue: number) {
    return dieValue >= 1 && dieValue <= 6 ? true : false;
  }

  get playerName() {
    return this._playerName;
  }

  set playerName(v: string) {
    this._playerName = v;
  }

  get dieCount() {
    return this._dieCount;
  }

  set dieCount(v: number) {
    this._dieCount = v;
  }

  get dieValue() {
    return this._dieValue;
  }

  set dieValue(v: number) {
    this._dieValue = v;
  }

  get playerCount() {
    return this._playerCount;
  }

  set playerCount(v: number) {
    this._playerCount = v;
  }
}
