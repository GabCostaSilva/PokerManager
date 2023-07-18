import React, {useEffect, useState} from "react";
import {Button, Flex, Spacer, VStack} from "native-base";
import getTourney from "../actions/getTourney";
import {routes} from "../routes";

export const EditTourney = ({route, navigation}) => {
    const [_tourney, setTourney] = useState(null);
    const tourney = route.params?.tourney || {uuid: ""}

    useEffect(() => {
        return () => {
            (async () => {
                setTourney(await getTourney(tourney.uuid))
            })()
        }
    }, []);

    function navigateToTourneyOnField(field: number) {
        navigation.navigate(routes.tournament, {
            currentPage: field
        })
    }

    return <Flex alignItems="left" justifyContent={'space-between'} p="4">
        <FullWOutlineMdButton key={0} onPress={() => navigateToTourneyOnField(0)}>
            Nome do Torneio
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={1} onPress={() => navigateToTourneyOnField(1)}>
            Stack Inicial
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={2} onPress={() => navigateToTourneyOnField(2)}>
            Fichas
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={3} onPress={() => navigateToTourneyOnField(3)}>
            Blinds
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={4} onPress={() => navigateToTourneyOnField(5)}>
            Buy In
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={5} onPress={() => navigateToTourneyOnField(6)}>
            Resenha
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={6} onPress={() => navigateToTourneyOnField(7)}>
            Jogadores
        </FullWOutlineMdButton>
    </Flex>
}

const FullWOutlineMdButton = ({onPress, children}) => {
    return <Button variant={'outline'} size={"md"} w={'100%'} onPress={onPress}>
        {children}
    </Button>
}

