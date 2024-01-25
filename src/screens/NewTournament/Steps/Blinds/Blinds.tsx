import {Box, Flex, HStack, Icon, IconButton, Modal, Spacer, VStack} from "native-base";
import React, {useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import FormContainer from "../../FormContainer";
import {routes_names} from "../../../../routes/routes_names";
import NewBlind from "./NewBlind";
import {Blind, useTourneyStore} from "../../../../state/Tournament";
import {Button, ButtonText, FlatList, Text} from "@gluestack-ui/themed";
import NewBlindModal from "./NewBlindModal";
import {ListRenderItemInfo} from "react-native";

export default function Blinds({navigation}) {
    let {blinds} = useTourneyStore(state => state.tourney) || {blinds: []};
    const [modalVisible, setModalVisible] = useState(false);

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    function onPress() {
        navigation.navigate(routes_names.tournament, {screen: "Resenha"});
    }

    // @ts-ignore
    return <FormContainer onPressNextPage={onPress}>
        <Flex direction={"row"} justify={"flex-end"} w={"100%"} mb={2}>
            <Button
                size={"sm"}
                action={"positive"}
                onPress={() => {
                    setModalVisible(true);
                }}>
                <ButtonText>Novo Blind</ButtonText>
            </Button>
        </Flex>
        <VStack space={"md"} w="sm">
            <HStack justifyContent="space-between">
                <Text>No</Text>
                <Text>Small</Text>
                <Text>Big</Text>
                <Text>Ante</Text>
                <Text>Tempo</Text>
                <Text>Editar</Text>
            </HStack>
            <FlatList data={blinds}
                      renderItem={({item: blind}: ListRenderItemInfo<Blind>) => <Box borderBottomWidth="1"
                                                                                     _dark={{borderColor: "muted.50"}}
                                                                                     borderColor="muted.800"
                                                                                     pl={["0", "4"]} pr={["0", "5"]}>
                          <VStack space={[2, 3]} justifyContent="space-between">
                              {!blind.isPause ?
                                  <HStack justifyContent="space-between">
                                      <Text>{blind.title}</Text>
                                      <Text>
                                          {blind.small}
                                      </Text>
                                      <Text>
                                          {blind.big}
                                      </Text>
                                      <Text>
                                          {blind.ante}
                                      </Text>
                                      <Text fontSize="$sm" bold alignSelf="flex-start">
                                          {blind.time + "m"}
                                      </Text>
                                      <IconButton icon={<Icon as={<AntDesign name="edit"/>}/>}/>
                                  </HStack>
                                  : <HStack justifyContent="space-between" backgroundColor={"yellow.500"}>
                                      <Text italic>PAUSA</Text>
                                      <Text fontSize="$sm" bold alignSelf="flex-start">{blind.durationInMinutes + "m"}</Text>
                                      <Text italic>{blind.stopGameAfterEnd ? "pausa o jogo após o fim" : ""}</Text>
                                  </HStack>}
                              <Spacer/>
                          </VStack>
                      </Box>}
                      keyExtractor={item => ((Math.random() + 1) * 100).toString()}
            />
        </VStack>

        <NewBlindModal onClose={() => setModalVisible(false)}
                       initialFocusRef={initialRef}
                       finalFocusRef={finalRef}
                       open={modalVisible}
                       modalVisible={setModalVisible}
                       isNewBlindOpen={false}
                       isNewPauseOpen={false}
        />
    </FormContainer>;
}
