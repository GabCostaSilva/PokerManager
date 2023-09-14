import { Avatar, VStack, Divider, Button, HStack } from "native-base";
import { Box, Heading, Text } from "@gluestack-ui/themed";

import React from "react";

export const Profile = () => {

  return <VStack space={3} divider={<Divider />} p="4" >
    <Avatar bg="purple.600" alignSelf="center" size="2xl" source={{
      uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
    }} />
    <Heading size={"sm"}>Josias Aristides</Heading>
    <VStack space="md">
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"$sm"}>Email</Text>
        <Text fontSize={"$md"}>josias@gmail.com</Text>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"$sm"}>Telefone</Text>
        <Text fontSize={"$md"}>(11) 99329-3737</Text>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"$sm"}>Usuário</Text>
        <Text fontSize={"$md"}>josias.aristides</Text>
      </HStack>
    </VStack>
    <Button variant="ghost" colorScheme="danger" alignSelf={'start'} w={16}>
      Sair
    </Button>
  </VStack>;
};