import {Button, Center, Divider, Flex, Heading, HStack, Icon, Modal, Pressable, Text, VStack} from "native-base";
import React, {useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {AntDesign} from "@expo/vector-icons";
import {useTourneyStore} from "../../state/Tournament";
import SystemNotification from "../../components/SystemNotification";
import {listTourneys} from "../../state/actions/listTourneys";
import {routes_names} from "../../routes/routes_names";
import {useAuthContext} from "../../hooks/useAuthContext";
import {AxiosResponse} from "axios";

interface TourneyForListing {
    uuid: string,
    players: [];
    initialStack: number;
    name: string
}

export function Home({route, navigation}) {
    const [tourneys, setTourneys] = useState<TourneyForListing[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedTourney, setSelectedTourney] = useState<TourneyForListing>(null);
    const [error, setError] = useState(null);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const clearTourney = useTourneyStore(state => state.clearTourney);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            (async () => {
                let response: React.SetStateAction<TourneyForListing[]> | AxiosResponse<any, any>;
                try {
                    response = await listTourneys();
                } catch (err) {
                    console.error(err);
                    setError("Erro ao carregar torneios do usuário. Tente novamente mais tarde.");
                }
                if (isActive) {
                    const params = route ? route.params : null;

                    if (params) alert(params.message);
                    // @ts-ignore
                    setTourneys(response?.data);
                }
            })
            ();

            return () => {
                isActive = false;
            };
        }, [route])
    );

    /* TODO Adicionar gesture para atualizar lista */
    return <VStack space={3} divider={<Divider/>} w="100%" p="4">
        <HStack justifyContent="flex-end">
            <Button
                minW={100}
                backgroundColor={"green.500"}
                onPress={() => {
                    clearTourney();
                    navigation.navigate(routes_names.tournament, {screen: routes_names.new_tournament})
                }}>
                <Text color={"white"} bold>
                    Novo Torneio
                </Text>
            </Button>
        </HStack>

        <Flex flexDir={"row"}>
            <Text flexGrow={1} w={[16, 20]} bold>Nome</Text>
            <Text flexGrow={1} bold>Stack Inicial</Text>
            <Text flexGrow={1} bold>Jogadores</Text>
            <Text flexGrow={1} bold>Data</Text>
        </Flex>

        <Modal
            onClose={() => setModalVisible(false)}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={modalVisible}
            safeAreaTop={true}
        >
            <Modal.Content>
                <Modal.Header>Ações</Modal.Header>
                <Modal.CloseButton/>
                <Modal.Body>
                    <Center>
                        <Button.Group colorScheme="lightBlue" mx={{
                            base: "auto",
                            md: 0
                        }} size="lg">
                            <Button variant="outline"
                                    rightIcon={<Icon as={<AntDesign name="copy1"/>} name="editTourney"/>}
                            >
                                Clonar
                            </Button>
                            <Button rightIcon={<Icon as={<AntDesign name="edit"/>} name="editTourney"/>}
                                    onPress={() => {
                                        navigation.navigate(routes_names.edit_tourney, {
                                            tourney: {
                                                uuid: selectedTourney.uuid
                                            }
                                        });
                                    }}
                            >
                                Editar
                            </Button>
                        </Button.Group>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal>
        {tourneys && tourneys.length > 0
            ? tourneys.map((tourney) => (
                    <Pressable key={tourney.uuid}
                               onLongPress={() => {
                                   setSelectedTourney(tourney);
                                   setModalVisible(true);
                               }}
                    >
                        {({isPressed, isFocused, isHovered}) => (
                            <Flex
                                rounded="8"
                                style={{
                                    zIndex: .5,
                                    transform: [{
                                        scale: (isPressed || isFocused) ? .96 : 1
                                    }]
                                }}
                                flexDir={"row"}
                            >
                                <Text flexGrow={1} w={[16, 20]} ellipsizeMode={"tail"}
                                      numberOfLines={1}>{tourney.name}</Text>
                                <Text flexGrow={1} w={[18, 20]} textAlign={"center"}>{tourney.initialStack}</Text>
                                <Text flexGrow={1} textAlign={"center"}>{tourney.players.length}</Text>
                                <Center flexGrow={1}>22/04/23</Center>
                            </Flex>
                        )}
                    </Pressable>
                )
            ) : error ? <SystemNotification
                closeFn={() => {
                    setError(null);
                }}
                message={error}
                title={"Erro de sistema"}
                status={"error"}
            /> : <Heading>Torneios não encontrados</Heading>}
    </VStack>;

}