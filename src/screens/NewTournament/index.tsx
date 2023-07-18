import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    HStack,
    Input,
    KeyboardAvoidingView,
    Text,
    View,
    VStack
} from "native-base";
import React, {useState} from "react";
import {Blind} from "./Blinds/BlindsList";
import NewBlind from "./Blinds/NewBlind";
import Chips from "./Chips/Chips";
import StepsButtonGroup from "../../components/StepsButtonGroup";
import {onlyNumbers} from "../../utils";
import {BuyIn} from "./BuyIn";
import {ShareCosts} from "./ShareCosts";
import {PlayersList} from "./Players/PlayersList";
import saveTournament from "../../actions/saveTournament";
import {routes} from "../../routes";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const MyTextInput = ({onChange, value, children}) => (
    <>
        <Input size={"2xl"}
               mb={5}
               onChangeText={onChange}
               value={value}
        />
        {children}
    </>
)

const Stack = createNativeStackNavigator();

export function NewTournament({navigation, route}) {
    const {currentPage} = route.params
    const [page, setPage] = useState(currentPage || 0);


    const [formState, setFormState] = useState<TournamentState>({
        name: '',
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

    const FormTitles = ["Nome do Torneio",
        "Stack Inicial",
        "Fichas",
        "Blinds",
        "Novo Blind",
        "Buy In",
        "Resenha",
        "Jogadores"
    ]

    function handleChange(prop: string, value: any) {
        setFormState((prevState) => {
            return {...prevState, [prop]: value}
        })
    }

    async function onSubmit() {
        await saveTournament(formState);

        setPage(0)
        navigation.navigate(routes.home, {
            message: "Torneio criado com sucesso!"
        })
    }

    const PageDisplay = () => {
        switch (page) {
            case 0:
                return <MyTextInput onChange={text => handleChange("name", text)} value={formState.name}>
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </MyTextInput>
            case 1:
                return <>
                    <Input size={"2xl"}
                           mb={5}
                           placeholder={"0"}
                           keyboardType='numeric'
                           value={formState.initialStack.toString()}
                           onChangeText={text => handleChange("initialStack", onlyNumbers(text))}
                    />
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </  >
            case 2:
                return <Chips setFormState={setFormState}
                              setPage={setPage}
                              currentPage={page}
                              pages={FormTitles}
                />
            case 3:
                return <Blind setPage={setPage}
                              formState={formState}
                              setFormState={handleChange}
                              currentPage={page}
                              pages={FormTitles}/>
            case 4:
                return <NewBlind setPage={setPage} formState={formState} setFormState={setFormState}/>
            case 5:
                return <BuyIn setFormState={setFormState}>
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </BuyIn>
            case 6:
                return <ShareCosts setFormState={setFormState}>
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </ShareCosts>
            case 7:
                return <PlayersList setFormState={setFormState} formState={formState}>
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </PlayersList>
            default:
                navigation.navigate(routes.home)
        }
    }

    return (<Stack.Navigator>

        </Stack.Navigator>
    );
}
