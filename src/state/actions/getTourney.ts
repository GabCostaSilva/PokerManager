import { client } from "../../adapters/controllers/client";

export default async (uuid: string) => {
  try {
    return await client.get(`/tourney/${uuid}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
