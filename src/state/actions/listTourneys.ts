import { client } from "../../adapters/controllers/client";

export const listTourneys = async () => {

  try {
    return await client.get("/tourney");
  } catch (error) {
    console.error(error);
    throw error;
  }
};