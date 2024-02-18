import {Avatar, Divider, HStack, VStack} from "native-base";
import {Button, ButtonGroup, ButtonIcon, ButtonText, EditIcon, Heading, Text} from "@gluestack-ui/themed";

import React from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {routes_names} from "../../routes/routes_names";

export const UserProfile = ({navigation}) => {
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
        <ButtonGroup justifyContent={"space-between"}>
            <Button variant="solid" action="negative" alignSelf={"flex-start"}
                    minWidth={"$10"}
                    onPress={async () => {
                        await logout();
                        navigation.navigate(routes_names.home)
                    }}>
                <ButtonText>Sair</ButtonText>
            </Button>
            <ButtonGroup flexDirection={"column"}
                         justifyContent={"flex-end"} alignItems={"flex-end"} minWidth={"$10"}>
                <Button variant="solid" action="primary"
                        size="md"
                        alignSelf={"flex-end"}
                        onPress={async () => {
                            navigation.navigate(routes_names.edit_profile)
                        }}>
                    <ButtonText>Editar</ButtonText>
                    <ButtonIcon as={EditIcon} ml={"$1"}/>
                </Button>
                <Button variant="link" action="primary"
                        size="md"
                        onPress={async () => {
                            navigation.navigate(routes_names.change_password)
                        }}>
                    <ButtonText>Trocar senha</ButtonText>
                </Button>
            </ButtonGroup>

        </ButtonGroup>
    </VStack>;
};
