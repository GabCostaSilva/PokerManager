import {Button, FormControl, Input, VStack} from "native-base";
import React from "react";

export function Blind({onSubmit, setData, formData, errors}) {
    return <VStack width="90%" mx="3" maxW="300px" justifyContent='center'>
        <FormControl>
            <FormControl.Label _text={{
                bold: true
            }}>Stack inicial</FormControl.Label>
            <Input placeholder="Torneio 1" onChangeText={value => setData({
                ...formData,
                name: value
            })}/>
            <FormControl.HelperText _text={{
                fontSize: 's'
            }}>
                {'name' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> :
                    <FormControl.HelperText>
                        Deve conter ao menos 3 caracteres
                    </FormControl.HelperText>}
            </FormControl.HelperText>
            <FormControl.ErrorMessage _text={{
                fontSize: 's'
            }}>
                Erro
            </FormControl.ErrorMessage>
        </FormControl>
        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
            Próximo
        </Button>
    </VStack>;
}