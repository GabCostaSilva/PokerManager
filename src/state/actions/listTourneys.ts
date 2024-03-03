import {httpClient} from "../../adapters/controllers/client";

export const listTourneys = async () => {

    try {
        return httpClient.get("/tourney");
    } catch (error) {
        console.error(error);
        throw error;
    }
};
