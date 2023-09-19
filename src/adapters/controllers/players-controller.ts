import { client } from "./client";

export default class PlayersController {
  private path = "/auth";

  constructor() {
  }

  async listPlayers() {
    try {
      return await client.get(this.path);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}