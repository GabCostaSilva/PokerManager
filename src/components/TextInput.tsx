import {VStack} from "native-base";
import React from "react";
import {Input, InputField} from "@gluestack-ui/themed";
import {InputErrorLabel} from "./inputs/InputErrorLabel";

const TextInput = ({
                       onChangeText,
                       value,
                       isPassword = false,
                       placeholder = "",
                       isDisabled = false,
                       errors = []
                   }: InputFieldProps) => {
    return <VStack justifyContent={"center"}>
        <Input size={"md"} isDisabled={isDisabled} isInvalid={0 < errors.length}>
            <InputField placeholder={placeholder}
                        onChangeText={onChangeText}
                        type={isPassword ? "password" : "text"}
                        autoCapitalize={"none"}
                        value={value}/>
        </Input>
        {errors && errors.map((error, index) => (
                <VStack>
                    <InputErrorLabel error={error}/>
                </VStack>
            )
        )}

    </VStack>
}

type InputFieldProps = {
    onChangeText: (text: any) => void,
    onBlur?: (any) => any,
    value: any,
    name?: string,
    isPassword?: boolean,
    placeholder?: string,
    isDisabled?: boolean,
    errors?: string[],
}

export default TextInput