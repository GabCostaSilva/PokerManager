import {Masks, useMaskedInputProps} from 'react-native-mask-input';

import React from "react";
import TextInput from "../TextInput";

interface PhoneInputProps {
    phoneNumber: string,
    setPhone: (phone: string) => void
}

export const PhoneInput = ({phoneNumber, setPhone}: PhoneInputProps) => {

    const maskedInputProps = useMaskedInputProps({
        value: phoneNumber,
        onChangeText: setPhone,
        mask: Masks.BRL_PHONE,
    });

    return <TextInput {...maskedInputProps}/>
}
