import {create} from 'zustand'

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
    name: string,
    initialStack: number,
    chips: Chip[],
    blinds: Blind[],
    buyIn: BuyIn[],
    shareCosts: boolean,
    players: Player[]
}

const tournamentStore = create<TournamentState>()(set => ({
    name: '',
    initialStack: 0,
    chips: [],
    blinds: [],
    buyIn: [],
    shareCosts: false,
    players: []
}))
