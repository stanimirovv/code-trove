// url is not used but it is more compatible if you have it
export function generateShortURL(url: string) {
  return (Math.random() + 1).toString(36).substring(7);
}
