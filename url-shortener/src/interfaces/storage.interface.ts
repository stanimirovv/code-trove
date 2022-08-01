import { IURL } from "./url.interface";

export interface IStorage {
  set(url: IURL): string;
  get(shortUrl: string): string | null;
}
