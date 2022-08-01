import * as bp from "body-parser";
import express from "express";
import { LStorage } from "./LStorage";
import { URLShortenService } from "./urlShortenService";

export const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const port = 3000;

const location = process.env["storage_location"] ?? "storage";
const storage = new LStorage(location);
const urlShortenService = new URLShortenService(storage);

app.get("/g/:shortUrl", (req, res) => {
  const url = urlShortenService.getShortUrl(req.params.shortUrl);
  if (!url) {
    res.status(404);
    res.send("Not Found");
    return;
  }
  res.status(302);
  res.header("Location", url);
  res.send();
});

app.post("/shortUrl", (req, res) => {
  const url = req.body.url;
  const shortenedUrl = urlShortenService.generateShortUrl(url);
  res.send(`Token: ${shortenedUrl}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
