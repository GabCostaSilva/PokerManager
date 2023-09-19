import {
  Box,
  Button,
  Center,
  Circle,
  Container,
  FlatList,
  Flex,
  HStack,
  Modal,
  Spacer,
  Text,
  VStack
} from "native-base";
import UserAvatar from "react-native-user-avatar";

import React, { useState } from "react";
import { NewPlayer } from "./NewPlayer";
import PlayersController from "../../../../adapters/controllers/players-controller";
import { routes_names } from "../../../../routes/routes_names";

// TODO: adicionar zustand state aqui

export default ({ navigation, children }) => {
  // const data = [{
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  //     fullName: "Aafreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  // }, {
  //     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //     fullName: "Sujitha Mathur",
  //     timeStamp: "11:11 PM",
  //     recentText: "Cheer up, there!",
  //     avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
  // }, {
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     fullName: "Anci Barroco",
  //     timeStamp: "6:22 PM",
  //     recentText: "Good Day!",
  //     avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
  // }, {
  //     id: "68694a0f-3da1-431f-bd56-142371e29d72",
  //     fullName: "Aniket Kumar",
  //     timeStamp: "8:56 PM",
  //     recentText: "All the best",
  //     avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
  // }, {
  //     id: "28694a0f-3da1-471f-bd96-142456e29d72",
  //     fullName: "Kiara",
  //     timeStamp: "12:47 PM",
  //     recentText: "I will call today.",
  //     avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  // },
  //     {
  //         id: "28694a0f-3da1-471f-bd96-142456e9d72",
  //         fullName: "Kiara",
  //         timeStamp: "12:47 PM",
  //         recentText: "I will call today.",
  //         avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  //     },
  //     {
  //         id: "28694a0f-3da1-471f-bd96-14245672",
  //         fullName: "Kiara",
  //         timeStamp: "12:47 PM",
  //         recentText: "I will call today.",
  //         avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  //     },
  //     {
  //         id: "28694a0rerf-3da1-471f-bd96-14245672",
  //         fullName: "Kiara",
  //         timeStamp: "12:47 PM",
  //         recentText: "I will call today.",
  //         avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  //     },
  //
  // ];
  const playersController = new PlayersController();
  const [modalVisible, setModalVisible] = useState(false);
  const [players, setPlayers] = useState([]);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  React.useEffect(() => {
    playersController.listPlayers()
      .then(async (response) => {
        setPlayers(response.data);
      });
  }, []);

  return <Center>
    <Container w={"100%"} h={[600, 1024]}>
      <Flex direction={"row"} justify={"flex-end"} w={"100%"} mb={5} pt={[5, 10]}>
        <Button
          // w={[32, 64]}
          colorScheme={"info"}
          onPress={() => {
            setModalVisible(true);
          }}>
          Novo Jogador
        </Button>
      </Flex>
      <FlatList data={players}
                w={"100%"}
                mb={5}
                flexGrow={0}
                renderItem={({ item }) => (
                  <Box borderBottomWidth="1"
                       _dark={{ borderColor: "muted.50" }}
                       borderColor="muted.800"
                       pl={["2", "4"]}
                       pr={["3", "5"]}
                       py="2"
                  >
                    <HStack space={[2, 3]} justifyContent="flex-end" alignItems={"center"}>
                      <UserAvatar size={50} name={item.name} />
                      <Text _dark={{
                        color: "warmGray.50"
                      }} color="coolGray.800" bold>
                        {item.name}
                      </Text>
                      {/*{item.isOnline ? <Circle size="15px" bg="green.500" ml="auto" /> :*/}
                      {/*  <Circle size="15px" bg="red.500" ml="auto" />}*/}
                      <Spacer />
                    </HStack>
                  </Box>)}
                keyExtractor={item => item.userName}
      />
    </Container>
    <Flex direction={"row"} justifyContent={"space-between"} minW={72} pl={[4, 6]}>
      <Button w={[32, 64]} variant={"outline"} colorScheme={"danger"}>Cancelar</Button>
      <Button w={[32, 64]} colorScheme={"success"} onPress={() => {
        navigation.navigate(routes_names.home);
      }}>
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
        <Modal.CloseButton />
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
