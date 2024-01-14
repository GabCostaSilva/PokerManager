import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ShareCosts} from "./Steps/ShareCosts";
import {BuyIn} from "./Steps/BuyIn";
import TourneyName from "./Steps/TourneyName";
import InitialStack from "./Steps/InitialStack";
import Chips from "./Steps/Chips/Chips";
import Blinds from "./Steps/Blinds/Blinds";
import PlayersList from "./Steps/Players/PlayersList";
import {Game} from "./Game";

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

export interface Player {
    name: string,
    phoneNumber: string,
    email: string,
    docNumber: string,
    pix: string,
    bank: string,
    bankAgency: string,
    bankAccountNumber: string,
    picPay: string
}

export interface TournamentState {
    name: string,
    initialStack: number,
    chips: Chip[],
    blinds: Blind[],
    buyIn: BuyIn,
    shareCosts: boolean,
    players: Player[]
}

const Stack = createNativeStackNavigator();

export function NewTournament({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Nome do Torneio"}
                          component={TourneyName}
                          options={{headerShown: true, headerBackTitleVisible: false}}
            />
            <Stack.Screen name={"Stack Inicial"} component={InitialStack}/>
            <Stack.Screen name={"Fichas"} component={Chips}/>
            <Stack.Screen name={"Buy In"} component={BuyIn}/>
            <Stack.Screen name={"Blinds"} component={Blinds}/>
            <Stack.Screen name={"Resenha"} component={ShareCosts}/>
            <Stack.Screen name={"Jogadores"} component={PlayersList}/>
            <Stack.Screen name={"Partida"} component={Game}/>
        </Stack.Navigator>
    );
}
