import {Box, Button, FlatList, HStack, Text, Spacer, VStack, Flex, IconButton, Icon, Divider} from "native-base";
import React from "react";
import {AntDesign} from "@expo/vector-icons";
import StepsButtonGroup from "../../../components/StepsButtonGroup";

interface Blind {
    title: number,
    small: number,
    big: number,
    ante: number,
    time: string,
    pause: number
}

interface BlindProps {
    page: any
}

interface BlindProps {
    pages: any
}

export function Blind({setPage, data, currentPage, pages}) {
    return <Box>
        <Flex direction={"row-reverse"} justify={"end"}>
            <Button style={{
                backgroundColor: "green"
            }}
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
            <FlatList data={data}
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
                      keyExtractor={item => item.title.toString()}
            />
            <StepsButtonGroup setPage={setPage}
                              currentPage={currentPage}
                              pages={pages}/>
        </VStack>
    </Box>;
}