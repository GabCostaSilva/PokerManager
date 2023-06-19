import {Box, Button, Heading, HStack, Input, KeyboardAvoidingView, Text, VStack} from "native-base";
import React, {useState} from "react";
import {View} from "react-native";
import {Chips} from "./Chips/Chips";
import {Blind} from "./Blinds/Blind";
import NewBlind from "./Blinds/NewBlind";
import BlindLevel from "./Blinds/BlindLevel";
import Pause from "./Blinds/Pause";
import StepsButtonGroup from "../../components/StepsButtonGroup";

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

export function NewTournament({navigation}) {

    const [page, setPage] = useState(0);
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
    ]

    function handleChange(initialStack: string, number: any) {

    }

    function getNumber(value: string) {
        return parseInt(value.replace(/[^0-9]/g, ''));
    }

    const PageDisplay = () => {
        switch (page) {
            case 0:
                return <VStack justifyContent={"center"}>
                    <Input size={"lg"}/>
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </VStack>
            case 1:
                return <VStack justifyContent={"center"}>
                    <Input
                        size="lg"
                        placeholder={"0"}
                        onChangeText={value => handleChange("initialStack", getNumber(value))}
                    />
                    <StepsButtonGroup setPage={setPage} currentPage={page} pages={FormTitles}/>
                </VStack>
            case 2:
                return <Chips errors={null}
                              setData={setFormState}
                              formData={formState}
                              setPage={setPage} currentPage={page} pages={FormTitles}
                />
            case 3:
                return <Blind setPage={setPage} data={formState.blinds} currentPage={page}
                              pages={FormTitles}/>
            case 4:
                return <NewBlind setPage={setPage} formState={formState} setFormState={setFormState}/>
        }
    }

    const FormContainer = ({children}) => {
        return <Box safeArea maxW="290" justifyContent={"center"}>{children}</Box>
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
        </KeyboardAvoidingView>);
}

