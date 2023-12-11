import {
    AlertCircleIcon,
    Box,
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
    Switch
} from "@gluestack-ui/themed";

export default function () {
    return <Box h="$32" w="$72">
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
            <FormControlHelper>
                <FormControlHelperText>
                    Deve ser maior que zero
                </FormControlHelperText>
            </FormControlHelper>
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
            <Switch size="md" isDisabled={false} />
        </FormControl>
    </Box>
}