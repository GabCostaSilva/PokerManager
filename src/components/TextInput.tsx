import {VStack} from "native-base";
import React from "react";
import {Input, InputField} from "@gluestack-ui/themed";

const TextInput = ({onChangeText, value, isPassword = false, placeholder = ""}) => {
    return <VStack justifyContent={"center"}>
        <Input size={"md"}>
            <InputField placeholder={placeholder}
                        onChangeText={onChangeText}
                        type={isPassword ? "password" : "text"}
                        autoCapitalize={"none"}
                        value={value}/>
        </Input>
    </VStack>;
}

export default TextInput