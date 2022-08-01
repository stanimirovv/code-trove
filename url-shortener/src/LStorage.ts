import { LocalStorage } from "node-localstorage";
import { IStorage } from "./interfaces/storage.interface";
import { IURL } from "./interfaces/url.interface";

export class LStorage implements IStorage {
  private _localStorage: LocalStorage;

  constructor(storageLocation: string) {
    this._localStorage = new LocalStorage(storageLocation);
  }

  public set(url: IURL) {
    this._localStorage.setItem(url.shortUrl, url.redirectUrl);
    return url.shortUrl;
  }

  public get(shortUrl: string): string | null {
    const url: string | null = this._localStorage.getItem(shortUrl);

    return url;
  }
}
