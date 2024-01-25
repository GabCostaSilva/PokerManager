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
import React from "react";

export default function () {
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
                <Input>
                    <InputField type="text" defaultValue="10" placeholder="minutos"/>
                </Input>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon}/>
                    <FormControlErrorText>
                        Deve ser maior que zero
                    </FormControlErrorText>
                </FormControlError>
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
                <Switch size="md" isDisabled={false}/>
            </FormControl>
            <HStack justifyContent="center" space="md">
                <Button
                    variant="outline"
                    onPress={() => {

                    }}>
                    <Text>
                        Cancelar
                    </Text>
                </Button>

                <Button
                    onPress={() => {
                    }}>
                    <Text color="white">
                        Adicionar
                    </Text>
                </Button>
            </HStack>
        </VStack>
    </Box>
}