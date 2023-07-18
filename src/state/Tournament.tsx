import {create} from 'zustand'
import omit from 'lodash-es/omit'
import getTourney from "../actions/getTourney";

interface Chip {
    value: number,
    color: string
}

interface Blind {
    title: number,
    small: number,
    big: number,
    ante: number,
    time: string,
    pause: number
}

interface BuyIn {
    value: number,
    currency: string
}

interface Player {
    name: string,
    phoneNumber: string,
    email: string,
    docNumber: string,
    pix: string,
    bank: string,
    bankAgency: string,
    bankAccountNumber: string,
    picPay: boolean
}

interface TournamentState {
    clearTourney: () => void,
    loadTourney: (uuid: string) => any,
    patchTourney: (prop: string, value: any) => void,
    tourney: {
        name: string,
        initialStack: number,
        chips: Chip[],
        blinds: Blind[],
        buyIn: BuyIn[],
        shareCosts: boolean,
        players: Player[]
    }
}

export const useTourneyStore = create<TournamentState>()(set => ({
    tourney: {
        name: '',
        initialStack: 0,
        chips: [],
        blinds: [],
        buyIn: [],
        shareCosts: false,
        players: []
    },
    loadTourney: async (uuid) => {
        let tourney = await getTourney(uuid);
        set({tourney})
    },
    patchTourney: (prop, value) =>
        set((state) => ({tourney: {...state.tourney, [prop]: value}})),
    clearTourney: () => set((state) => omit(state, ['tourney'], true))
}))

