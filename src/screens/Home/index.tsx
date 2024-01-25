import {
    Button as NativeButton,
    Center,
    Divider,
    FlatList,
    Flex,
    Heading,
    HStack,
    Icon,
    Modal,
    Pressable,
    VStack
} from "native-base";
import React, {useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {useTourneyStore} from "../../state/Tournament";
import SystemNotification from "../../components/SystemNotification";
import {listTourneys} from "../../state/actions/listTourneys";
import {routes_names} from "../../routes/routes_names";
import {AxiosResponse} from "axios";
import {
    AddIcon,
    Button,
    ButtonIcon,
    ButtonText,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    SearchIcon,
    Text,
    TrashIcon
} from "@gluestack-ui/themed";

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
            clearTourney();
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
            })();

            return () => {
                isActive = false;
            };
        }, [route])
    );

    return <VStack space={3} divider={<Divider/>} w="100%" p="4">
        <HStack justifyContent="space-between" alignItems={'center'}>
            <Heading size={"lg"}>Torneios</Heading>
            <Button
                variant={"solid"}
                size={"sm"}
                action={"positive"}
                onPress={() => {
                    clearTourney();
                    navigation.navigate(routes_names.tournament, {screen: routes_names.new_tournament})
                }}>
                <ButtonText>
                    Novo Torneio
                </ButtonText>
                <ButtonIcon as={AddIcon}/>
            </Button>
        </HStack>

        <Modal
            onClose={() => setModalVisible(false)}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={modalVisible}
            safeAreaTop={true}
        >
            <Modal.Content>
                <Modal.Header>Ações do Torneio <Text italic={true}
                                                     size={"md"}>{selectedTourney?.name}</Text></Modal.Header>
                <Modal.CloseButton/>
                <Modal.Body>
                    <Center>
                        <Text></Text>
                        <NativeButton.Group colorScheme="lightBlue" size="lg">
                            {/*<Button variant="outline"*/}
                            {/*        rightIcon={<Icon as={<AntDesign name="copy1"/>} name="editTourney"/>}*/}
                            {/*>*/}
                            {/*    Clonar*/}
                            {/*</Button>*/}
                            <Button variant="solid"
                                    action={"negative"}>
                                <ButtonText>Remover</ButtonText>
                                <ButtonIcon as={TrashIcon}/>
                            </Button>
                            {/*<Button rightIcon={<Icon as={<AntDesign name="edit"/>} name="editTourney"/>}*/}
                            {/*        onPress={() => {*/}
                            {/*            navigation.navigate(routes_names.edit_tourney, {*/}
                            {/*                tourney: {*/}
                            {/*                    uuid: selectedTourney.uuid*/}
                            {/*                }*/}
                            {/*            });*/}
                            {/*        }}*/}
                            {/*>*/}
                            {/*    Editar*/}
                            {/*</Button>*/}
                        </NativeButton.Group>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal>
        {tourneys && tourneys.length > 0
            ? <Flex>
                <Flex flexDir={"row"} justifyContent={"space-between"} mb={2}>
                    <Input
                        size="md"
                        flexGrow={1}
                        variant={"outline"}
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                        mr={4}
                    >
                        <InputField placeholder="Data do torneio"/>
                        <InputSlot m={4}>
                            <InputIcon>
                                <Icon as={SearchIcon}/>
                            </InputIcon>
                        </InputSlot>
                    </Input>
                    <Button variant={"outline"}
                            action={"secondary"}
                            isFocusVisible={false}>
                        <ButtonText>
                            Filtrar
                        </ButtonText>
                    </Button>
                </Flex>
                <Flex flexDir={"row"}>
                    <Text flexGrow={1} mr={8} bold>Nome</Text>
                    <Text flexGrow={1} bold>Stack Inicial</Text>
                    <Text flexGrow={1} bold>Jogadores</Text>
                    <Text flexGrow={1} bold>Data</Text>
                </Flex>
                <FlatList data={tourneys}
                          maxHeight={["85%", "95%"]}
                          renderItem={
                              ({item}) => <Pressable key={item.uuid}
                                                     onLongPress={() => {
                                                         setSelectedTourney(item);
                                                         setModalVisible(true);
                                                     }}>
                                  {({isPressed, isFocused, isHovered}) => (
                                      <Flex
                                          rounded="8"
                                          py={4}
                                          borderBottomWidth={1}
                                          style={{
                                              zIndex: .5,
                                              transform: [{
                                                  scale: (isPressed || isFocused) ? .96 : 1
                                              }]
                                          }}
                                          flexDir={"row"}>
                                          <Text flexGrow={1} w={16} ellipsizeMode={"tail"}
                                                numberOfLines={1}>{item.name}</Text>
                                          <Text flexGrow={1} w={18}
                                                textAlign={"center"}>{item.initialStack}</Text>
                                          <Text flexGrow={1} textAlign={"center"}>{item.players.length}</Text>
                                          <Center flexGrow={1}>22/04/23</Center>
                                      </Flex>
                                  )}
                              </Pressable>
                          }/>
            </Flex>
            : error ? <SystemNotification
                closeFn={() => {
                    setError(null);
                }}
                message={error}
                title={"Erro de sistema"}
                status={"error"}
            /> : <Heading>Torneios não encontrados</Heading>}
    </VStack>;

}