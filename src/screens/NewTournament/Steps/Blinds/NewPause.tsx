import {
    AlertCircleIcon,
    Box, Button, ButtonGroup,
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
    Switch,
    Text
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

    return <Box h="$32" w="$72">
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
                    onPress={() => {
                        setModalVisible(prevState => false);
                    }}>
                    <Text>
                        Cancelar
                    </Text>
                </Button>

                <Button
                    onPress={() => {
                        addBlind(pause);
                        setPause(initialState);
                        setModalVisible(false);
                    }}>
                    <Text color="white">
                        Adicionar
                    </Text>
                </Button>
            </HStack>
        </VStack>
    </Box>
}
