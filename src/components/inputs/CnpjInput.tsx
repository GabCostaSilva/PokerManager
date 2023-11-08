import {InputProps} from "./InputProps";
import {Masks, useMaskedInputProps} from "react-native-mask-input";
import TextInput from "../TextInput";
import React from "react";

export const CnpjInput = ({value, onChangeText}: InputProps) => {

    const maskedInputProps = useMaskedInputProps({
        value: value,
        onChangeText: onChangeText,
        mask: Masks.BRL_CNPJ,
    });

    return <TextInput {...maskedInputProps}/>
}