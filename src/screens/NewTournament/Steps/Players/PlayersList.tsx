import {
    Box,
    Center,
    Circle,
    Container,
    FlatList,
    HStack,
    Spacer,
    Text,
    Button as NativeBaseButton, Icon
} from "native-base";

import React, {useState} from "react";
import PlayersController from "../../../../adapters/controllers/players-controller";
import {routes_names} from "../../../../routes/routes_names";
import {useTourneyStore} from "../../../../state/Tournament";
import {saveTournament} from "../../../../state/actions/saveTournament";
import {Button, ButtonIcon, ButtonText, Heading, PlayIcon} from "@gluestack-ui/themed";
import {useAuthContext} from "../../../../hooks/useAuthContext";

export default ({navigation, children}) => {
    const playersController = new PlayersController();
    const {user} = useAuthContext();
    const tourneyStore = useTourneyStore(state => state.tourney);
    const addPlayerToTourney = useTourneyStore(state => state.addPlayer);
    const removePlayerFromTourney = useTourneyStore(state => state.removePlayer);

    const [players, setPlayers] = useState([]);

    React.useEffect(() => {
        console.log("loading players")
        playersController.listPlayers()
            .then(async (response) => {
                console.log(response.data.users)
                setPlayers(response.data.users.filter(player => player.uid !== user.uid));
            });
    }, []);

    function handleStartTourney() {
        return async () => {
            await saveTournament(tourneyStore);
            navigation.reset({
                routes: [{name: routes_names.home}]
            });
        };
    }

    function addPlayer(playerId: string) {
        return () => {
            addPlayerToTourney(playerId);
        };
    }

    function isPlayerAdded(item: { uid: string; }) {
        return tourneyStore?.players?.includes(item.uid);
    }

    function removePlayer(uuid: string) {
        return () => {
            removePlayerFromTourney(uuid);
        };
    }

    return <Center>
        <Container w={"100%"} h={[600, 1024]} pt={[4, 8]}>
            {players.length ? <FlatList data={players}
                                        w={"100%"}
                                        mb={5}
                                        flexGrow={0}
                                        renderItem={({item}) => (
                                            <Box borderBottomWidth="1"
                                                 _dark={{borderColor: "muted.50"}}
                                                 borderColor="muted.800"
                                                 pl={["2", "4"]}
                                                 pr={["3", "5"]}
                                                 py="2"
                                                 key={item.uid}
                                            >
                                                <HStack space={[2, 3]} justifyContent="space-between"
                                                        alignItems={"center"}>
                                                    <Text _dark={{
                                                        color: "warmGray.50"
                                                    }} color="coolGray.800" bold w={48}>
                                                        {item.email}
                                                    </Text>
                                                    {item.isOnline ? <Circle size="15px" bg="green.500" ml="auto"/> :
                                                        <Circle size="15px" bg="red.500" ml="auto"/>}
                                                    <Spacer/>
                                                    {isPlayerAdded(item) ?
                                                        <NativeBaseButton size={"sm"} colorScheme={"secondary"}
                                                                          onPress={removePlayer(item.uid)}>
                                                            <Text color={'white'}>
                                                                Remover
                                                            </Text>
                                                        </NativeBaseButton>
                                                        :
                                                        <NativeBaseButton onPress={addPlayer(item.uid)} size={"sm"}>
                                                            <Text color={'white'}>Adicionar</Text>
                                                        </NativeBaseButton>}
                                                </HStack>
                                            </Box>)}
                                        keyExtractor={item => item.username}
            /> : <Text>Não há jogadores para serem adicionados. Convide seus amigos para jogar!</Text>}
        </Container>
        {/*<Flex direction={"row"} justifyContent={"space-between"} minW={72} pl={[4, 6]} mb={[12, 24]}>*/}
        <HStack pl={4} pb={4} justifyContent={"space-between"} minW={72}>
            <Button variant={"outline"} action={"secondary"} size="md"
                    onPress={() => {
                        navigation.navigate(routes_names.home);
                    }}>


                <ButtonText>
                    Cancelar
                </ButtonText>
            </Button>
            <Button
                action={"positive"}
                onPress={handleStartTourney()}
                size="md"

            >
                <ButtonText>Iniciar Partida</ButtonText>
            </Button>
        </HStack>
        {/*</Flex>*/}
        {children}
    </Center>;
};
