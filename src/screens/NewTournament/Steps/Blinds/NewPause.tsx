import {
    Box,
    Button,
    ButtonText,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Switch
} from "@gluestack-ui/themed";
import {HStack, VStack} from "native-base";
import React, {useState} from "react";
import {Blind, useTourneyStore} from "../../../../state/Tournament";
import {onlyNumbers} from "../../../../utils/utils";
import {NumericInput} from "../../../../components/NumericInput";

export default function ({setModalVisible}) {
    let addBlind = useTourneyStore(state => state.addBlind);
    let initialState = {
        title: 0,
        small: 0,
        big: 0,
        ante: 0,
        time: 0,
        durationInMinutes: 0,
        stopGameAfterEnd: false,
        isPause: true
    };
    const [pause, setPause] = useState<Blind>(initialState);

    return <Box>
        <VStack space={3} mt="5">
            <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={true}
            >
                <FormControlLabel mb="$1">
                    <FormControlLabelText>Tempo em minutos</FormControlLabelText>
                </FormControlLabel>
                <NumericInput
                    onChangeText={(value) => {
                        const durationInMinutes = onlyNumbers(value);
                        setPause({...pause, durationInMinutes});
                    }}
                    value={onlyNumbers(pause.durationInMinutes.toString()).toString()}
                />
            </FormControl>
            <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={true}
            >
                <FormControlLabel mb="$1">
                    <FormControlLabelText>Pausar o jogo após o fim deste intervalo?</FormControlLabelText>
                </FormControlLabel>
                <Switch size="md"
                        isDisabled={false}
                        value={pause.stopGameAfterEnd}
                        onToggle={() => {
                            setPause({...pause, stopGameAfterEnd: !pause.stopGameAfterEnd})
                        }}
                />
            </FormControl>
            <HStack justifyContent="center" space="md">
                <Button
                    variant="outline"
                    action="secondary"
                    onPress={() => {
                        setModalVisible(prevState => false);
                    }}>
                    <ButtonText>
                        Cancelar
                    </ButtonText>
                </Button>

                <Button
                    onPress={() => {
                        addBlind(pause);
                        setPause(initialState);
                        setModalVisible(false);
                    }}>
                    <ButtonText>
                        Adicionar
                    </ButtonText>
                </Button>
            </HStack>
        </VStack>
    </Box>
}
