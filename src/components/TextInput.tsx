import {VStack} from "native-base";
import React from "react";
import {Input, InputField} from "@gluestack-ui/themed";

type InputFieldProps = {
    onChangeText: (text: any) => void,
    value: any,
    name?: string,
    isPassword?: boolean,
    placeholder?: string,
    isDisabled?: boolean,
    isInvalid?: boolean,
}

const TextInput = ({
                       onChangeText,
                       value,
                       isPassword = false,
                       placeholder = "",
                       isDisabled = false,
                       isInvalid = false
                   }: InputFieldProps) => {

    return <VStack justifyContent={"center"}>
        <Input size={"md"} isDisabled={isDisabled} isInvalid={isInvalid}>
            <InputField placeholder={placeholder}
                        onChangeText={onChangeText}
                        type={isPassword ? "password" : "text"}
                        autoCapitalize={"none"}
                        value={value}/>
        </Input>
    </VStack>
}

export default TextInput