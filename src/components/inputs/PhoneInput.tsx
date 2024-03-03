import {Masks, useMaskedInputProps} from 'react-native-mask-input';

import React from "react";
import TextInput from "../TextInput";
import {InputProps} from "./InputProps";

export const PhoneInput = ({value, onChangeText}: InputProps) => {

    const removeCountryCode = (value: string) => {
        console.log("this is value", value)
        return value.replace(/^\+\d{1,3}/, '');
    };

    const maskedInputProps = useMaskedInputProps({
        value: removeCountryCode(value),
        onChangeText: onChangeText,
        mask: Masks.BRL_PHONE,
    });

    return <TextInput {...maskedInputProps}/>
}
