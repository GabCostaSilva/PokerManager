import React, {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ShareCosts} from "./Steps/ShareCosts";
import {BuyIn} from "./Steps/BuyIn";
import TourneyName from "./Steps/TourneyName";
import InitialStack from "./Steps/InitialStack";
import Chips from "./Steps/Chips/Chips";
import Blinds from "./Steps/Blinds/Blinds";
import PlayersList from "./Steps/Players/PlayersList";
import {Game} from "./Game";
import {TourneyResume} from "./Steps/TourneyResume";

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
            <Stack.Screen name={"Resumo"} component={TourneyResume}/>
            <Stack.Screen name={"Partida"} component={Game}/>
        </Stack.Navigator>
    );
}
