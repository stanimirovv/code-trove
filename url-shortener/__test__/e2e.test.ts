import { client } from "stadius";

describe("Test URL shorten service", () => {
  const baseUrl = "localhost:3000";

  it("missing url", async () => {
    const resp = await client.GET(`${baseUrl}/g/missingURL`);
    expect(resp.statusCode).toEqual(404);
    expect(resp.text).toEqual("Not Found");
  });

  it("shorten url and redirect", async () => {
    const resp = await client.POST(
      `${baseUrl}/shortUrl`,
      {},
      { url: "https://www.dir.bg" }
    );
    expect(resp.statusCode).toEqual(200);
    expect(resp.text.substring("Token: ")).not.toBe(-1);

    const token = resp.text.split(" ")[1];

    const redirectResp = await client.GET(`${baseUrl}/g/${token}`);
    expect(redirectResp.statusCode).toEqual(302);
  });
});
