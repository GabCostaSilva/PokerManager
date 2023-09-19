import { client } from "../../adapters/controllers/client";

export const saveTournament = async (data) => {
  try {
    return await client.post("/tourney", data);
  } catch (e) {
    console.error("SAVE TOURNAMENT", e);
    throw e;
  }
};