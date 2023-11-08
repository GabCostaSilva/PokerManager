import {Masks, useMaskedInputProps} from 'react-native-mask-input';

import React from "react";
import TextInput from "../TextInput";
import {InputProps} from "./InputProps";

export const PhoneInput = ({value, onChangeText}: InputProps) => {

    const maskedInputProps = useMaskedInputProps({
        value: value,
        onChangeText: onChangeText,
        mask: Masks.BRL_PHONE,
    });

    return <TextInput {...maskedInputProps}/>
}
