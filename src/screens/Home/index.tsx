import {
    Center,
    List,
    Container,
    FlatList,
    Flex,
    Heading,
    HStack,
    StatusBar,
    Text,
    Box, Divider, Icon, VStack
} from "native-base";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect} from "react";

const data = [{
    id: "",
    total: 1239.67
}]

export function Home({route, navigation}) {
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const params = route ? route.params : null
        if (params)
            alert(params.message)
    }, []);

    return <VStack space={3} divider={<Divider/>} w="100%" p="4">
        <HStack justifyContent="space-between">
            <Text bold>Nome</Text>
            <Text bold>Stack Inicial</Text>
            <Text bold>Jogadores</Text>
            <Text bold>Data</Text>
        </HStack>
        <HStack justifyContent="space-between">
            <Text>Torneio 1</Text>
            <Text>500</Text>
            <Text>7</Text>
            <Text>22/04/23</Text>
        </HStack>
        <HStack justifyContent="space-between">
            <Text>Torneio 2</Text>
            <Text>600</Text>
            <Text>10</Text>
            <Text>22/04/23</Text>
        </HStack>
        <HStack justifyContent="space-between">
            <Text>Torneio 3</Text>
            <Text>900</Text>
            <Text>15</Text>
            <Text>22/04/23</Text>
        </HStack>
    </VStack>

}