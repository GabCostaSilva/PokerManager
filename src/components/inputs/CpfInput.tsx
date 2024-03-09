import {Masks, useMaskedInputProps} from 'react-native-mask-input';

import React from "react";
import TextInput from "../TextInput";
import {InputProps} from "./InputProps";

export const CpfInput = ({value, onChangeText, errors = []}: InputProps) => {

    const maskedInputProps = useMaskedInputProps({
        value: value,
        onChangeText: onChangeText,
        mask: Masks.BRL_CPF,
    });

    return <TextInput {...maskedInputProps} errors={errors}/>
}
