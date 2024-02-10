import {Avatar, Divider, HStack, VStack} from "native-base";
import {Button, ButtonText, Heading, Text} from "@gluestack-ui/themed";

import React from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {routes_names} from "../../routes/routes_names";

export const Profile = ({navigation}) => {
    // @ts-ignore
    const {user, logout} = useAuthContext();

    return <VStack space={3} divider={<Divider/>} p="4">
        <Avatar bg="gray.300" alignSelf="center" size="2xl" source={{
            uri: user?.photoURL
        }}/>
        <Heading size={"sm"} alignSelf={"center"}>{user?.name}</Heading>
        <VStack space="md">
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Usuário</Text>
                <Text fontSize={"$md"}>{user?.username}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Email</Text>
                <Text fontSize={"$md"}>{user?.email}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Telefone</Text>
                <Text fontSize={"$md"}>{user?.phoneNumber}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Documento</Text>
                <Text fontSize={"$md"}>{user?.docNumber}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Pix</Text>
                <Text fontSize={"$md"}>{user?.pix}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Banco</Text>
                <Text fontSize={"$md"}>{user?.bank}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Agência</Text>
                <Text fontSize={"$md"}>{user?.bankAgency}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Conta</Text>
                <Text fontSize={"$md"}>{user?.bankAccountNumber}</Text>
            </HStack>

        </VStack>
        <Button variant="solid" action="negative" alignSelf={"flex-start"}
                onPress={async () => {
                    await logout();
                    //@ts-ignore
                    navigation.navigate(routes_names.home)
                }}>
            <ButtonText>Sair</ButtonText>
        </Button>
    </VStack>;
};