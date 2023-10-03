import { Avatar, VStack, Divider, Button, HStack } from "native-base";
import { Box, Heading, Text } from "@gluestack-ui/themed";

import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export const Profile = () => {
  // @ts-ignore
  const { user, logout } = useAuthContext();

  //TODO fix logout flow
  return <VStack space={3} divider={<Divider />} p="4">
    <Avatar bg="purple.600" alignSelf="center" size="2xl" source={{
      uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
    }} />
    <Heading size={"sm"}>{user?.name}</Heading>
    <VStack space="md">
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"$sm"}>Email</Text>
        <Text fontSize={"$md"}>{user?.email}</Text>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"$sm"}>Telefone</Text>
        <Text fontSize={"$md"}>{user?.phoneNumber}</Text>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"$sm"}>Usuário</Text>
        <Text fontSize={"$md"}>{user?.userName}</Text>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <Text fontSize={"$sm"}>PicPay</Text>
        <Text fontSize={"$md"}>{user?.picPay}</Text>
      </HStack>
    </VStack>
    <Button variant="ghost" colorScheme="danger" alignSelf={"flex-start"} w={16} onPress={logout}>
      Sair
    </Button>
  </VStack>;
};