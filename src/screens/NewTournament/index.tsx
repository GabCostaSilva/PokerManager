import {Box, Button, Heading, HStack, Input, KeyboardAvoidingView, Text, VStack} from "native-base";
import React, {useState} from "react";
import {View} from "react-native";
import {Blind} from "./Blinds/Blind";
import NewBlind from "./Blinds/NewBlind";
import Chips from "./Chips/Chips";
import * as FileSystem from 'expo-file-system';
import saveTournament from "../../actions/saveTournament";
import StepsButtonGroup from "../../components/StepsButtonGroup";
import {NumericInput} from "../../components/NumericInput";
import {onlyNumbers} from "../../utils";

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

    const Steps = [{
        1: "Nome do Torneio",
        2: "Stack Inicial",
        3: "Fichas",
        4: "Blinds",
        5: "Novo Blind",
        6: "Buy In",
        7: "Resenha",
        8: "Jogadores"
    }]

    function handleChange(prop: string, value: any) {
        setFormState((prevState) => {
            return {...prevState, [prop]: value}
        })
    }

    async function onSubmit() {
        await saveTournament(JSON.stringify(formState), `${formState.name}.json`);
        navigation.navigate("Início", {
            message: "Torneio criado com sucesso!"
        })
    }

    const PageDisplay = () => {
        switch (page) {
            case 0:
                return <VStack justifyContent={"center"}>
                    <NumericInput size={"2xl"}
                                  mb={5}
                                  keyboardType='numeric'
                                  onChangeText={text => {
                                      handleChange("name", text)
                                  }}
                                  value={formState.name}
                    />
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                    <Input onChangeText={(text) => {
                        setState(prevState => ({...prevState, name: text}))
                    }}
                           value={state.stuff}
                    />
                </VStack>
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
                return <Blind setPage={(page) => setPage}
                              formState={formState}
                              setFormState={handleChange}
                              currentPage={page}
                              pages={FormTitles}/>
            case 4:
                return <NewBlind setPage={setPage} formState={formState} setFormState={setFormState}/>
        }
    }

    const FormContainer = ({children}) => {
        return <Box safeArea maxW="290" justifyContent={"center"} ml={50}>{children}</Box>
    }

    return (
        <KeyboardAvoidingView>
            <View>
                <Heading fontSize="xl" p="4" pb="3">
                    {FormTitles[page]}
                </Heading>
            </View>

            {/* body */}
            <FormContainer>
                {PageDisplay()}
            </FormContainer>
            {page >= FormTitles.length - 1 ?
                <HStack justifyContent='center' space='md'>
                    <Button
                        variant="outline"
                        onPress={() => onSubmit()}>
                        <Text>
                            Iniciar
                        </Text>
                    </Button>
                    <Button
                        onPress={() => setPage(currentPage => currentPage === 3 ? currentPage + 2 : currentPage + 1)}>
                        <Text color="white">
                            Cancelar
                        </Text>
                    </Button>
                </HStack>
                : <></>}
        </KeyboardAvoidingView>);
}
