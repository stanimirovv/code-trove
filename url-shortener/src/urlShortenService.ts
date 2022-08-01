import { generateShortURL } from "./generateShortURL";
import { IStorage } from "./interfaces/storage.interface";
import { IURL } from "./interfaces/url.interface";

export class URLShortenService {
  private _storage: IStorage;
  constructor(storage: IStorage) {
    this._storage = storage;
  }

  public getShortUrl(shortUrl: string) {
    return this._storage.get(shortUrl);
  }

  public generateShortUrl(redirectUrl: string) {
    let shortUrl = "";
    let duplicateUrl = true;
    while (duplicateUrl) {
      shortUrl = generateShortURL(redirectUrl);
      const urlExists = this.getShortUrl(shortUrl);
      if (!urlExists) {
        duplicateUrl = false;
      }
    }

    const url: IURL = { redirectUrl, shortUrl };
    return this._storage.set(url);
  }
}
