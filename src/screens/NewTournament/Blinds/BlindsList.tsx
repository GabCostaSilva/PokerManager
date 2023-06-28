import {Box, Button, FlatList, HStack, Text, Spacer, VStack, Flex, IconButton, Icon, Divider} from "native-base";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import StepsButtonGroup from "../../../components/StepsButtonGroup";
import {TournamentState} from "../index";

interface BlindsList {
    title: number,
    small: number,
    big: number,
    ante: number,
    time: string,
    pause: number
}

interface Props {
    setPage: Dispatch<SetStateAction<number>>,
    setFormState: (prop: string, value) => void,
    formState: TournamentState,
    currentPage: number,
    pages: string[]
}

export function Blind({formState, currentPage, pages, setPage}: Props) {
    const [blinds, setBlinds] = useState<BlindsList[]>([]);

    useEffect(() => {
        setBlinds(formState.blinds)
    }, []);

    // @ts-ignore
    return <>
        <Flex direction={"row-reverse"} justify={"end"} w={"100%"}>
            <Button
                minW={100}
                backgroundColor={"green.500"}
                onPress={() => {
                    setPage(4)
                }}>
                <Text color={"white"}>
                    Novo Blind
                </Text>
            </Button>
        </Flex>
        <VStack space={3} w="100%" p="4">
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
            <StepsButtonGroup setPage={setPage}
                              currentPage={currentPage}
                              pages={pages}/>
        </VStack>
    </>;
}
