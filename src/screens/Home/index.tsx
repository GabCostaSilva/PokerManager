import {Button, Divider, Heading, HStack, Text, VStack} from "native-base";
import React, {useEffect, useState} from "react";
import listTourneys from "../../actions/listTourneys";
import {useFocusEffect} from '@react-navigation/native';


interface TourneyForListing {
    players: [];
    initialStack: number;
    name: string
}

export function Home({route, navigation}) {

    const [tourneys, setTourneys] = useState<TourneyForListing[]>([]);

    useEffect(() => {
        const params = route ? route.params : null
        if (params) {
            alert(params.message)
        }

        (async () => {
            const response = await listTourneys();
            setTourneys(response)
        })()
    }, [tourneys]);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            (async () => {
                const response = await listTourneys();
                if (isActive) setTourneys(response)
            })()
            return () => {
                isActive = false;
            }

        }, [tourneys])
    );

    return <VStack space={3} divider={<Divider/>} w="100%" p="4">
        <HStack justifyContent="flex-end">
            <Button
                minW={100}
                backgroundColor={"green.500"}
                onPress={() => {
                    navigation.navigate("Novo Torneio")
                }}
            >
                <Text color={"white"} bold>
                    Novo Torneio
                </Text>
            </Button>
        </HStack>
        <HStack justifyContent="space-between">
            <Text bold>Nome</Text>
            <Text bold>Stack Inicial</Text>
            <Text bold>Jogadores</Text>
            <Text bold>Data</Text>
        </HStack>
        {tourneys && tourneys.length > 0 ? tourneys.map((tourney) => (
            <HStack justifyContent="space-between" key={Math.floor(Math.random() * 100000)}>
                <Text>{tourney.name}</Text>
                <Text>{tourney.initialStack}</Text>
                <Text>{tourney.players.length}</Text>
                <Text>22/04/23</Text>
            </HStack>)) : <Heading>Carregando...</Heading>}

    </VStack>

}