import { Player } from "../../game/player";

describe("test Player", () => {
  it("sets correct name", () => {
    const player = new Player("Test");
    expect(player.name).toEqual("Test");
  });
});
