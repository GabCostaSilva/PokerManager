import {
    Box,
    Center,
    Circle,
    Container,
    FlatList,
    HStack,
    Spacer,
    Text,
    Button as NativeBaseButton, Icon, Avatar
} from "native-base";

import React, {useState} from "react";
import PlayersController from "../../../../adapters/controllers/players-controller";
import {routes_names} from "../../../../routes/routes_names";
import {useTourneyStore} from "../../../../state/Tournament";
import {saveTournament} from "../../../../state/actions/saveTournament";
import {Button, ButtonIcon, ButtonText, Heading, PlayIcon} from "@gluestack-ui/themed";
import {useAuthContext} from "../../../../hooks/useAuthContext";
import FormContainer from "../../FormContainer";

export default ({navigation, children}) => {
    const playersController = new PlayersController();
    const {user} = useAuthContext();
    const tourneyStore = useTourneyStore(state => state.tourney);
    const addPlayerToTourney = useTourneyStore(state => state.addPlayer);
    const removePlayerFromTourney = useTourneyStore(state => state.removePlayer);
    const [players, setPlayers] = useState([]);

    React.useEffect(() => {
        playersController.listPlayers()
            .then(async (response) => {
                setPlayers(response.data.users.filter(player => player.uid !== user.uid));
            });
    }, []);

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

    function onPress() {
        navigation.navigate(routes_names.tournament, {screen: "Resumo"});
    }

    return <FormContainer onPressNextPage={onPress}>
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
                                                    <Avatar bg="gray.300" alignSelf="center" size="md" source={{
                                                        uri: user?.photoURL
                                                    }}/>
                                                    <Text _dark={{
                                                        color: "$dark" + ((Math.random() * 100) + 100).toString()
                                                    }} color="coolGray.800" bold w={48}>
                                                        {item.displayName}
                                                    </Text>
                                                    {item.isOnline ? <Circle size="15px" bg="green.500" ml="auto"/> :
                                                        <Circle size="15px" bg="red.500" ml="auto"/>}
                                                    <Spacer/>
                                                    {isPlayerAdded(item) ?
                                                        <Button width={"$32"} action={"negative"}
                                                                onPress={removePlayer(item.uid)}>
                                                            <ButtonText>
                                                                Remover
                                                            </ButtonText>
                                                        </Button>
                                                        :
                                                        <Button onPress={addPlayer(item.uid)} width={"$32"}>
                                                            <ButtonText>Adicionar</ButtonText>
                                                        </Button>}
                                                </HStack>
                                            </Box>)}
                                        keyExtractor={item => item.uid}
            /> : <Text>Não há jogadores para serem adicionados. Convide seus amigos para jogar!</Text>}
        </Container>
        {/*<HStack pl={4} pb={4} justifyContent={"space-between"} minW={72}>*/}
        {/*    /!*<Button action={"positive"}*!/*/}
        {/*    /!*        onPress={handleStartTourney()}*!/*/}
        {/*    /!*        size="md"*!/*/}
        {/*    /!*        minWidth={20}>*!/*/}
        {/*    /!*    <ButtonText>Criar Torneio</ButtonText>*!/*/}
        {/*    /!*</Button>*!/*/}
        {/*</HStack>*/}
        {children}
    </FormContainer>;
};
