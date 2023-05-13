import {FormControl, Input, VStack} from "native-base";
import React from "react";

export function FormField({label, placeholder, setData, name, formData, errors}) {
    return (<VStack width="100%" mx="3" maxW="300px" justifyContent='center'>
            <FormControl>
                <FormControl.Label _text={{bold: true}}>{label}</FormControl.Label>
                <Input placeholder={placeholder} onChangeText={value => setData({...formData, [name]: value})}/>
            </FormControl>
        </VStack>
    )
}