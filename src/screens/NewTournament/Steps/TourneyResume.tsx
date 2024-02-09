import {Heading, Text, Divider, VStack} from "@gluestack-ui/themed";
import {HStack, Stack} from "native-base";
import CloseableCircle from "../../../components/CloseableCircle";
import React from "react";
import {useTourneyStore} from "../../../state/Tournament";

export const TourneyResume = ({navigation}) => {
    const {
        name,
        initialStack,
        chips,
        buyIn,
        blinds,
        shareCosts,
        players
    } = useTourneyStore(state => state.tourney) || {
        name: "",
        initialStack: 0,
        chips: [],
        blinds: [],
        buyIn: {
            value: 0.00,
            currency: "R$"
        },
        shareCosts: false,
        players: []
    };
    console.log(blinds)

    function listSimpleTourneyInfo(title: string, content: string) {
        return <VStack mb={8}>
            <Heading>
                {title}
            </Heading>
            <Text>
                {content}
            </Text>
            <Divider my="$0.5"/>
        </VStack>;
    }

    return <VStack ml={12}>
        {listSimpleTourneyInfo("Título", name)}
        {listSimpleTourneyInfo("Stack Inicial", initialStack.toString())}
        {listSimpleTourneyInfo("Buy In", buyIn.currency + buyIn.value)}
        {listSimpleTourneyInfo("Dividir custos de resenha?", shareCosts ? "Sim" : "Não")}
        <VStack>
            <Heading>Fichas</Heading>
            <Stack
                flexWrap={"wrap"}
                direction="row"
                justifyContent={""}
                mb={5}
                space={3}>
                {chips.map((chip, i) => {
                    return (<CloseableCircle size={50}
                                             bg={chip.color}
                                             shadow="9"
                                             key={i}>
                        <Text color={"white"} bold borderColor={"black"}>{chip.value}</Text>
                    </CloseableCircle>);
                })}
            </Stack>
            <Divider my="$0.5"/>
        </VStack>
        <VStack>
            <Heading>Blinds</Heading>
            {blinds.map(blind => (
                    <HStack space={"lg"} key={blind.title}>
                        <Text>{blind.title}</Text>
                        {blind.isPause ? <Text italic>Pausa</Text>: <Text>{blind.small + "/" + blind.big}</Text>}
                        <Text>{blind.durationInMinutes + "m"}</Text>
                    </HStack>
                )
            )}
        </VStack>
    </VStack>
}
