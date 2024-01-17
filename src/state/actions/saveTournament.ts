import {httpClient} from "../../adapters/controllers/client";
import {Chip, Blind, BuyIn} from "../Tournament";

interface SaveTournamentParams {
    name: string;
    initialStack: number;
    chips: Chip[];
    blinds: Blind[];
    buyIn: BuyIn;
    shareCosts: boolean;
    players: string[]
}

export const saveTournament = async (tourneyData: SaveTournamentParams) => {
    try {
        return await httpClient.post("/tourney", tourneyData);
    } catch (e) {
        console.log(e.message)
        console.error("SAVE TOURNAMENT", e);
        throw e;
    }
};