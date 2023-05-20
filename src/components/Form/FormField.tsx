import {FormControl, Input, VStack} from "native-base";
import React from "react";

export function FormField({
                              label,
                              placeholder,
                              setData,
                              name,
                              formData,
                              value,
                              errors
                          }) {
    return (<VStack width="100%" justifyContent='center'>
            <FormControl>
                <FormControl.Label _text={{bold: true}}>{label}</FormControl.Label>
                <Input value={value} placeholder={placeholder}
                       onChangeText={value => setData(value)}/>
            </FormControl>
        </VStack>
    )
}