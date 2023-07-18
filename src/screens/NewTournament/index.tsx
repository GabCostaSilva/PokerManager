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
import {EditTourney} from "../EditTourney";
import {useTourneyStore} from "../../state/Tournament";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

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
const FormsContainer = ({onPressNextPage, children}) => {
    return <Center mt={12}>
        <Container alignItems={'center'}>
            {children}
        </Container>
        <Button
            onPress={onPressNextPage}
            minW={100}>
            <Text color="white">
                Próximo
            </Text>
        </Button>
    </Center>
}

function TourneyName({navigation, route}) {
    let {name} = useTourneyStore(state => state.tourney);
    let patchTourney = useTourneyStore(state => state.patchTourney);

    function onPress() {
        navigation.navigate(routes.tournament, {screen: "Stack Inicial"});
    }

    return <FormsContainer onPressNextPage={onPress}>
        <MyTextInput onChange={(text) => {
            patchTourney("name", text)
        }}
                     value={name}>
        </MyTextInput>
    </FormsContainer>
}

function InitialStack(props: {
    formState: TournamentState,
    onChangeText: (text) => void,
    page: (value: unknown) => void,
    currentPage: number,
    pages: string[]
}) {
    return <>
        <Input size={"2xl"}
               mb={5}
               placeholder={"0"}
               keyboardType="numeric"
               value={props.formState.initialStack.toString()}
               onChangeText={props.onChangeText}
        />
        <StepsButtonGroup setPage={props.page} currentPage={props.currentPage} pages={props.pages}/>
    </  >;
}

function BuyInWithButtons(props: {
    formState: (value: (((prevState: TournamentState) => TournamentState) | TournamentState)) => void,
    page: (value: unknown) => void,
    currentPage: number,
    pages: string[]
}) {
    return <BuyIn setFormState={props.formState}>
        <StepsButtonGroup setPage={props.page} currentPage={props.currentPage} pages={props.pages}/>
    </BuyIn>;
}

function ShareCostsWithButtons(props: {
    formState: (value: (((prevState: TournamentState) => TournamentState) | TournamentState)) => void,
    page: (value: unknown) => void,
    currentPage: number,
    pages: string[]
}) {
    return <ShareCosts setFormState={props.formState}>
        <StepsButtonGroup setPage={props.page} currentPage={props.currentPage} pages={props.pages}/>
    </ShareCosts>;
}

function Players(props: {
    formState: (value: (((prevState: TournamentState) => TournamentState) | TournamentState)) => void,
    formState1: TournamentState,
    page: (value: unknown) => void,
    currentPage: number,
    pages: string[]
}) {
    return <PlayersList setFormState={props.formState} formState={props.formState1}>
        <StepsButtonGroup setPage={props.page} currentPage={props.currentPage} pages={props.pages}/>
    </PlayersList>;
}

export function NewTournament({navigation, route}) {
    const currentPage = route.params?.currentPage || 0
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
            case 1:
                return <InitialStack formState={formState}
                                     onChangeText={text => handleChange("initialStack", onlyNumbers(text))}
                                     page={setPage}
                                     currentPage={page}
                                     pages={FormTitles}/>
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
                return <BuyInWithButtons formState={setFormState} page={setPage} currentPage={page} pages={FormTitles}/>
            case 6:
                return <ShareCostsWithButtons formState={setFormState} page={setPage} currentPage={page}
                                              pages={FormTitles}/>
            case 7:
                return <Players formState={setFormState} formState1={formState} page={setPage} currentPage={page}
                                pages={FormTitles}/>
            default:
                navigation.navigate(routes.home)
        }
    }

    return (<Stack.Navigator>

            <Stack.Screen name={"Nome do Torneio"}
                          component={TourneyName}
                          options={{headerShown: true, headerBackTitleVisible: false}}
            />
            <Stack.Screen name={"Stack Inicial"}
                          component={TourneyName}
            />

            {/*<Stack.Screen name={'Fichas'}*/}
            {/*              component={EditTourney}/>*/}

        </Stack.Navigator>
    );
}
