import React, {useEffect, useState} from "react";
import {Button, Flex, Spacer, VStack} from "native-base";
import getTourney from "../actions/getTourney";

export const EditTourney = ({route, navigation}) => {
    const [_tourney, setTourney] = useState(null);
    const {tourney} = route.params

    useEffect(() => {
        return () => {
            (async () => {
                setTourney(await getTourney(tourney.uuid))
            })()
        }
    }, []);

    return <Flex alignItems="left" justifyContent={'space-between'} p="4">
       <FullWOutlineMdButton key={1}>
           Nome do Torneio
       </FullWOutlineMdButton>
        <Spacer />
        <FullWOutlineMdButton key={2}>
            Stack Inicial
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={3}>
            Fichas
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={4}>
            Buy In
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={5}>
            Resenha
        </FullWOutlineMdButton>

        <FullWOutlineMdButton key={6}>
            Jogadores
        </FullWOutlineMdButton>
    </Flex>
}

const FullWOutlineMdButton = ({children}) => {
    return <Button variant={'outline'} size={"md"} w={'100%'}>
        {children}
    </Button>
}

