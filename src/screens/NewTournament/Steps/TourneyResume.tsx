import {Heading, Text, Divider, VStack, ButtonGroup, Button, ButtonText, Box} from "@gluestack-ui/themed";
import {HStack, Stack} from "native-base";
import CloseableCircle from "../../../components/CloseableCircle";
import React from "react";
import {useTourneyStore} from "../../../state/Tournament";
import {saveTournament} from "../../../state/actions/saveTournament";
import {routes_names} from "../../../routes/routes_names";

export const TourneyResume = ({navigation}) => {
    const tourneyStore = useTourneyStore(state => state.tourney);
    const {
        name,
        initialStack,
        chips,
        buyIn,
        blinds,
        shareCosts,
        players
    } = tourneyStore;

    function handleStartTourney() {
        return async () => {
            await saveTournament(tourneyStore);
            navigation.reset({
                routes: [{name: routes_names.home}]
            });
        };
    }

    function listSimpleTourneyInfo(title: string, content: string) {
        return <VStack>
            <Heading>
                {title}
            </Heading>
            <Text>
                {content}
            </Text>
            <Divider my="$0.5"/>
        </VStack>;
    }

    return <Box h="$80" justifyContent="center">
        <VStack ml={12}>
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
                            {blind.isPause ? <Text italic>Pausa</Text> : <Text>{blind.small + "/" + blind.big}</Text>}
                            <Text>{blind.durationInMinutes + "m"}</Text>
                        </HStack>
                    )
                )}
            </VStack>

            <ButtonGroup justifyContent={"center"} py={24}>
                <Button variant={"outline"} action={"secondary"} size="md" minWidth={64}
                        onPress={() => {
                            navigation.reset({
                                routes: [{name: routes_names.home}]
                            })
                        }}>
                    <ButtonText>
                        Cancelar
                    </ButtonText>
                </Button>
                <Button action={"positive"}
                        onPress={handleStartTourney()}
                        size="md"
                        minWidth={64}>
                    <ButtonText>Iniciar Torneio</ButtonText>
                </Button>
            </ButtonGroup>
        </VStack>
    </Box>
}
