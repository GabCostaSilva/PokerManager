import {Avatar, Divider, HStack, VStack} from "native-base";
import {Button, ButtonGroup, ButtonIcon, ButtonText, EditIcon, Heading, Text} from "@gluestack-ui/themed";

import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {routes_names} from "../../routes/routes_names";
import {getPhoneBR} from "../../utils/utils";

export const UserProfile = ({navigation, route}) => {
    let {user, logout, getProfile} = useAuthContext();
    const [currentUser, setCurrentUser] = useState(user)

    useEffect(() => {
        return navigation.addListener('focus', () => {
            (async () => {
                const userData = await getProfile();
                setCurrentUser(userData)
            })()
        });
    }, [navigation])

    function getDocMasked(doc: string) {
        if(!doc)
            return ""
        if(doc.length < 11)
            return doc
        return `${doc.substring(0,3)}.${doc.substring(3,6)}.${doc.substring(6, 9)}-${doc.substring(9, doc.length)}`
    }

    return <VStack space={3} divider={<Divider/>} p="4">
        <Avatar bg="gray.300" alignSelf="center" size="2xl" source={{
            uri: currentUser?.photoURL
        }}/>
        <Heading size={"sm"} alignSelf={"center"}>{currentUser?.name}</Heading>
        <VStack space="md">
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Usuário</Text>
                <Text fontSize={"$md"}>{currentUser?.username}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Email</Text>
                <Text fontSize={"$md"}>{currentUser?.email}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Telefone</Text>
                <Text fontSize={"$md"}>{getPhoneBR(currentUser?.phoneNumber)}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Documento</Text>
                <Text fontSize={"$md"}>{getDocMasked(currentUser?.docNumber)}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Pix</Text>
                <Text fontSize={"$md"}>{currentUser?.pix}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Banco</Text>
                <Text fontSize={"$md"}>{currentUser?.bank}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Agência</Text>
                <Text fontSize={"$md"}>{currentUser?.bankAgency}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
                <Text fontSize={"$sm"}>Conta</Text>
                <Text fontSize={"$md"}>{currentUser?.bankAccountNumber}</Text>
            </HStack>
        </VStack>
        <ButtonGroup justifyContent={"space-between"}>
            <Button variant="solid" action="negative" alignSelf={"flex-start"}
                    minWidth={"$10"}
                    style={{flex: 1}}
                    onPress={async () => {
                        await logout();
                        navigation.navigate(routes_names.home)
                    }}>
                <ButtonText>Sair</ButtonText>
            </Button>
            <ButtonGroup flexDirection={"column"}
                         style={{flex: 5}}
                         alignItems={"flex-end"}>
                {/*<Button variant="solid" action="primary"*/}
                {/*        onPress={async () => {*/}
                {/*            navigation.navigate(routes_names.edit_profile)*/}
                {/*        }}>*/}
                {/*    <ButtonText>Editar</ButtonText>*/}
                {/*    <ButtonIcon as={EditIcon} ml={"$1"}/>*/}
                {/*</Button>*/}
                <Button variant="link" action="secondary" disabled={true}
                        onPress={async () => {
                            navigation.navigate(routes_names.change_password)
                        }}>
                    <ButtonText>Trocar senha</ButtonText>
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    </VStack>;
};
