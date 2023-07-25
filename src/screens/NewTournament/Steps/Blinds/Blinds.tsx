import {
    Box,
    Button,
    Center,
    FlatList,
    Flex,
    HStack,
    Icon,
    IconButton,
    Modal,
    Spacer,
    Text,
    VStack
} from "native-base";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TournamentState } from "../../index";
import FormContainer from "../../FormContainer";
import { routes } from "../../../../routes";
import NewBlind from "./NewBlind";

interface Blind {
    title: number,
    small: number,
    big: number,
    ante: number,
    time: string,
    pause: number
}

export default function Blinds({navigation, route, setPage}) {
    const [blinds, setBlinds] = useState<Blind[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    useEffect(() => {
        setBlinds([])
    }, []);

    function onPress() {
        navigation.navigate(routes.tournament, { screen: "Resenha" });
    }


    // @ts-ignore
    return <FormContainer onPressNextPage={onPress}>
        <Flex direction={"row"} justify={"flex-end"} w={"100%"} mb={5}>
            <Button
                minW={100}
                backgroundColor={"green.500"}
                onPress={() => {
                   setModalVisible(true)
                }}>
                <Text color={"white"}>
                    Novo Blind
                </Text>
            </Button>
        </Flex>
        <VStack space={3} w="sm" mb={5}>
            <HStack justifyContent="space-between" p={2}>
                <Text>No</Text>
                <Text>Small</Text>
                <Text>Big</Text>
                <Text>Ante</Text>
                <Text>Tempo</Text>
                <Text>Editar</Text>
            </HStack>
            <FlatList data={blinds}
                      renderItem={({item}) => <Box borderBottomWidth="1" _dark={{borderColor: "muted.50"}}
                                                   borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                          <VStack space={[2, 3]} justifyContent="space-between">
                              <HStack justifyContent="space-between" p={2}>
                                  <Text>{item.title}</Text>
                                  <Text _dark={{color: "warmGray.50"}}
                                        color="coolGray.800"
                                  >
                                      {item.small}
                                  </Text>
                                  <Text color="coolGray.800" _dark={{
                                      color: "warmGray.200"
                                  }}>
                                      {item.big}
                                  </Text>
                                  <Text color="coolGray.800" _dark={{
                                      color: "warmGray.200"
                                  }}>
                                      {item.ante}
                                  </Text>
                                  <Text fontSize="xs" bold _dark={{
                                      color: "warmGray.50"
                                  }} color="coolGray.800" alignSelf="flex-start">
                                      {item.time + "s"}
                                  </Text>
                                  <IconButton icon={<Icon as={<AntDesign name="edit"/>}/>}/>
                              </HStack>
                              <Spacer/>
                          </VStack>
                      </Box>}
                      keyExtractor={item => ((Math.random() + 1) * 100).toString()}
            />
        </VStack>

        <Modal
          onClose={() => setModalVisible(false)}
          initialFocusRef={initialRef} finalFocusRef={finalRef}
          isOpen={modalVisible}
          safeAreaTop={true}
        >
            <Modal.Content>
                <Modal.Header>Novo Blind</Modal.Header>
                <Modal.CloseButton />
                <Modal.Body>
                    <NewBlind/>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    </FormContainer>;
}
