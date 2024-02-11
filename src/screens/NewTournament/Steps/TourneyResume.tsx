import {
    Box,
    Button,
    ButtonGroup,
    ButtonIcon,
    ButtonText,
    Divider,
    EditIcon,
    Heading,
    HStack,
    Text,
    VStack
} from "@gluestack-ui/themed";
import {Stack} from "native-base";
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

    function getHeading(title: string) {
        return <HStack justifyContent={"space-between"}>
            <Heading>
                {title}
            </Heading>
            <Button variant="link" action={"secondary"} onPress={() => {
                navigation.navigate(routes_names.tournament, {screen: title})
            }}>
                <ButtonIcon as={EditIcon} color="$backgroundLight900" h="$7"
                            w="$7" mr={"$3"}/>
            </Button>
        </HStack>;
    }

    function listSimpleTourneyInfo(title: string,
                                   content: string) {
        return <VStack>
            {getHeading(title)}
            <Text>
                {content}
            </Text>
            <Divider my="$0.5"/>
        </VStack>;
    }

    return <Box justifyContent="center">
        <VStack ml={"$3"}>
            {listSimpleTourneyInfo("Nome do Torneio", name)}
            {listSimpleTourneyInfo("Stack Inicial", initialStack.toString())}
            {listSimpleTourneyInfo("Buy In", buyIn.currency + buyIn.value)}
            {listSimpleTourneyInfo("Resenha", shareCosts ? "Sim" : "Não")}
            <VStack>
                {getHeading("Fichas")}
                <Stack
                    flexWrap={"wrap"}
                    direction="row"
                    justifyContent={""}
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
                {getHeading("Blinds")}
                {blinds.map(blind => (
                        <HStack space={"lg"} key={blind.title}>
                            <Text>{blind.title}</Text>
                            {blind.isPause ? <Text italic>Pausa</Text> : <Text>{blind.small + "/" + blind.big}</Text>}
                            <Text>{blind.durationInMinutes + "m"}</Text>
                        </HStack>
                    )
                )}
                <Divider my="$0.5"/>
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
