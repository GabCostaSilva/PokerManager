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
import {Blind} from "./Blinds/Blind";
import NewBlind from "./Blinds/NewBlind";
import Chips from "./Chips/Chips";
import StepsButtonGroup from "../../components/StepsButtonGroup";
import {onlyNumbers} from "../../utils";
import {BuyIn} from "./BuyIn";
import {ShareCosts} from "./ShareCosts";

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

export interface TournamentState {
    name: string,
    initialStack: number,
    chips: Chip[],
    blinds: Blind[],
    buyIn: BuyIn[],
    shareCosts: boolean,
    players: Player[]
}

const MyTextInput = ({onChange, value, key, children}) => (
    <VStack justifyContent={"center"} key={key}>
        <Input size={"2xl"}
               mb={5}
               onChangeText={onChange}
               value={value}
        />
        {children}
    </VStack>
)

export function NewTournament({navigation}) {
    const [page, setPage] = useState(0);
    const [state, setState] = useState({stuff: null});
    const [formState, setFormState] = useState<TournamentState>({
        name: '',
        initialStack: 0,
        chips: [],
        blinds: [],
        buyIn: [],
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
        // await saveTournament(JSON.stringify(formState), `${formState.name}.json`);
        setPage(0)
        navigation.navigate("Início", {
            message: "Torneio criado com sucesso!"
        })
    }

    const PageDisplay = () => {
        switch (page) {
            case 0:
                return <MyTextInput key={"dfsf"} onChange={text => handleChange("name", text)} value={formState.name}>
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </MyTextInput>
            case 1:
                return <VStack justifyContent={"center"}>
                    <Input size={"2xl"}
                           mb={5}
                           placeholder={"0"}
                           keyboardType='numeric'
                           value={formState.initialStack.toString()}
                           onChangeText={text => handleChange("initialStack", onlyNumbers(text))}
                    />
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </VStack>
            case 2:
                return <Chips formState={formState}
                              setFormState={setFormState}
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
                return <BuyIn>
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </BuyIn>
            case 6:
                return <ShareCosts setFormState={setFormState}>
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </ShareCosts>
            case 7:
                return <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
            default:
                navigation.navigate("Início")
        }
    }

    const FormContainer = ({children}) => {
        return <Box safeArea maxW="290" justifyContent={"center"} ml={70}>{children}</Box>
    }

    return (
        <View>
            <View w={"100%"}>
                <Heading fontSize="xl" p="4" pb="3">
                    {FormTitles[page]}
                </Heading>
            </View>

            {/* body */}
            {/*<FormContainer>*/}
            {/*<VStack space="5" minW={"250"} maxW={"290"} justifyContent='center' alignContent='center' ml={60}>*/}
            <Flex flexGrow={1} alignItems={"center"} justifyContent={"center"} pl={10} pr={10}>
                {PageDisplay()}
            </Flex>
            {/*</VStack>*/}
            {/*</FormContainer>*/}

            {page === FormTitles.length - 1 ?
                <HStack justifyContent='center' space='2xl'>
                    <Button
                        variant="outline"
                        minW={100}
                        bgColor={"red.500"}
                        onPress={() => {
                            let initialState = new class implements TournamentState {
                                blinds: Blind[];
                                buyIn: BuyIn[];
                                chips: Chip[];
                                initialStack: number;
                                name: string;
                                players: Player[];
                                shareCosts: boolean;
                            };
                            setFormState((prevState) => initialState)
                        }}
                    >
                        <Text color={"white"}>
                            Cancelar
                        </Text>
                    </Button>
                    <Button
                        onPress={() => onSubmit()}
                        minW={100}
                        backgroundColor={"green.500"}
                    >
                        <Text color="white" bold>
                            Iniciar
                        </Text>
                    </Button>
                </HStack>
                : <></>}
        </View>);
}
