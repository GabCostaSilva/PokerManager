import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepsButtonGroup from "../../components/StepsButtonGroup";
import { ShareCosts } from "./Steps/ShareCosts";
import { BuyIn } from "./Steps/BuyIn";
import { routes_names } from "../../routes/routes_names";
import TourneyName from "./Steps/TourneyName";
import InitialStack from "./Steps/InitialStack";
import Chips from "./Steps/Chips/Chips";
import Blinds from "./Steps/Blinds/Blinds";
import PlayersList from "./Steps/Players/PlayersList";
import { saveTournament } from "../../state/actions/saveTournament";
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

export function NewTournament({ navigation, route }) {
  const currentPage = route.params?.currentPage || 0;
  const [page, setPage] = useState(currentPage || 0);

  const [formState, setFormState] = useState<TournamentState>({
    name: "",
    initialStack: 0,
    chips: [],
    blinds: [],
    buyIn: {
      value: 0,
      currency: "R$"
    },
    shareCosts: false,
    players: []
  });

  async function onSubmit() {
    await saveTournament(formState);

    setPage(0);
    navigation.navigate(routes_names.home, {
      message: "Torneio criado com sucesso!"
    });
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name={"Nome do Torneio"}
                    component={TourneyName}
                    options={{ headerShown: true, headerBackTitleVisible: false }}
      />
      <Stack.Screen name={"Stack Inicial"} component={InitialStack} />
      <Stack.Screen name={"Fichas"} component={Chips} />
      <Stack.Screen name={"Buy In"} component={BuyIn} />
      <Stack.Screen name={"Blinds"} component={Blinds} />
      <Stack.Screen name={"Resenha"} component={ShareCosts} />
      <Stack.Screen name={"Jogadores"} component={PlayersList} />
      <Stack.Screen name={"Partida"} component={Game} />
    </Stack.Navigator>
  );
}
