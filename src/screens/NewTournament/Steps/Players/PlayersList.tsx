import {Box, Button, Center, Circle, Container, FlatList, Flex, HStack, Modal, Spacer, Text} from "native-base";
import UserAvatar from "react-native-user-avatar";

import React, {useState} from "react";
import {NewPlayer} from "./NewPlayer";
import PlayersController from "../../../../adapters/controllers/players-controller";
import {routes_names} from "../../../../routes/routes_names";
import {useTourneyStore} from "../../../../state/Tournament";
import {saveTournament} from "../../../../state/actions/saveTournament";

export default ({navigation, children}) => {
    const playersController = new PlayersController();
    const tourneyStore = useTourneyStore(state => state.tourney);
    const [modalVisible, setModalVisible] = useState(false);
    const [players, setPlayers] = useState([]);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    React.useEffect(() => {
        playersController.listPlayers()
            .then(async (response) => {
                setPlayers(response.data);
                console.log('players', response.data)
            });


    }, []);

    function handleStartTourney() {
        return async () => {
            await saveTournament(tourneyStore);
            navigation.navigate(routes_names.home);
        };
    }

    return <Center>
        <Container w={"100%"} h={[600, 1024]} pt={[4, 8]}>
            <FlatList data={players}
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
                          >
                              <HStack space={[2, 3]} justifyContent="space-between" alignItems={"center"}>
                                  {/*<Circle>{item.name?.charAt[0]}</Circle>*/}
                                  <Text _dark={{
                                      color: "warmGray.50"
                                  }} color="coolGray.800" bold w={48}>
                                      {item.userName}
                                  </Text>
                                  {item.isOnline ? <Circle size="15px" bg="green.500" ml="auto"/> :
                                      <Circle size="15px" bg="red.500" ml="auto"/>}
                                  <Spacer/>
                                  <Button>
                                      <Text color={"white"}>Adicionar</Text>
                                  </Button>
                              </HStack>
                          </Box>)}
                      keyExtractor={item => item.userName}
            />
        </Container>
        <Flex direction={"row"} justifyContent={"space-between"} minW={72} pl={[4, 6]} mb={[12, 24]}>
            <Button w={[32, 64]} variant={"outline"} colorScheme={"danger"}
                    onPress={() => {
                        navigation.navigate(routes_names.home);
                    }}
            >
                Cancelar
            </Button>
            <Button w={[32, 64]}
                    colorScheme={"success"}
                    onPress={handleStartTourney()}
            >
                <Text bold color={"white"}>Iniciar Partida</Text>
            </Button>
        </Flex>
        {children}
        <Modal
            onClose={() => setModalVisible(false)}
            initialFocusRef={initialRef} finalFocusRef={finalRef}
            isOpen={modalVisible}
            safeAreaTop={true}
        >
            <Modal.Content>
                <Modal.Header>Novo Jogador</Modal.Header>
                <Modal.CloseButton/>
                <Modal.Body>
                    <NewPlayer
                        formState={{}}
                        setIsNewPlayer={() => {
                        }}
                        closeModal={() => {
                            setModalVisible(false);
                        }}
                    />
                </Modal.Body>
            </Modal.Content>
        </Modal>
    </Center>;
};
