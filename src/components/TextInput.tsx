import {VStack} from "native-base";
import React from "react";
import {Input, InputField} from "@gluestack-ui/themed";

type InputFieldProps = {
    onChangeText: (text: any) => void,
    value: any,
    isPassword?: boolean,
    placeholder?: string,
    isDisabled?: boolean
}

const TextInput = ({
                       onChangeText,
                       value,
                       isPassword = false,
                       placeholder = "",
                       isDisabled = false
                   }: InputFieldProps) =>
    <VStack justifyContent={"center"}>
        <Input size={"md"} isDisabled={isDisabled}>
            <InputField placeholder={placeholder}
                        onChangeText={onChangeText}
                        type={isPassword ? "password" : "text"}
                        autoCapitalize={"none"}
                        value={value}/>
        </Input>
    </VStack>

export default TextInput