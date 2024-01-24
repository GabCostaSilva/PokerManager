import { httpClient } from "../../adapters/controllers/client";

export default async (uuid: string) => {
  try {
    return await httpClient.get(`/tourney/${uuid}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
