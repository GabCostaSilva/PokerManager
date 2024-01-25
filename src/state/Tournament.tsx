import {create} from "zustand";
import omit from "lodash-es/omit";
import getTourney from "./actions/getTourney";

export interface Player {
    name: string,
    phoneNumber: string,
    email: string,
    docNumber: string,
    pix: string,
    bank: string,
    bankAgency: string,
    bankAccountNumber: string,
    picPay: string,
    uuid?: string
}

export interface Chip {
    value: number,
    color: string
}

export interface Blind {
    title: number,
    small: number,
    big: number,
    ante: number,
    time: number,
    durationInMinutes?: number,
    stopGameAfterEnd?: boolean,
    isPause?: boolean
}

export interface BuyIn {
    value: number,
    currency: string
}

export interface TournamentState {
    tourney: {
        name: string,
        initialStack: number,
        chips: Chip[],
        blinds: Blind[],
        buyIn: BuyIn,
        shareCosts: boolean,
        players: string[]
    },
    clearTourney: () => void,
    loadTourney: (uuid: string) => any,
    patchTourney: (prop: string, value: any) => void,
    addBlind: (blind: Blind) => void,
    addPlayer: (playerId: string) => void,
    removePlayer: (playerId: string) => void,
}

export const useTourneyStore = create<TournamentState>()(set => ({
    tourney: {
        name: "",
        initialStack: 0,
        chips: [],
        blinds: [],
        buyIn: {
            value: 0.00,
            currency: "R$"
        },
        shareCosts: false,
        players: []
    },

    loadTourney: async (uuid) => {
        let tourney = await getTourney(uuid);
        // @ts-ignore
        set({tourney});
    },

    patchTourney: (prop, value) => set(
        (state) => ({
            tourney: {
                ...state.tourney,
                [prop]: value
            }
        })),

    addBlind: (blind: Blind) => set(
        (state) => {
            return {
                ...state,
                tourney: {
                    ...state.tourney,
                    blinds: [...state.tourney.blinds || [], blind]
                }
            };
        }
    ),

    addPlayer: (playerId: string) => set(
        (state) => {
            console.log("beens called?", playerId)
            return {
                ...state,
                tourney: {
                    ...state.tourney,
                    players: [...state.tourney.players || [], playerId]
                }
            };
        }
    ),

    removePlayer: (playerId: string) => set(
        (state) => {
            return {
                ...state,
                tourney: {
                    ...state.tourney,
                    players: state.tourney.players.filter((playerUuid) => playerUuid !== playerId)
                }
            };
        }
    ),

    clearTourney: () => set((state) => omit(state, ["tourney"]), true)
}));

