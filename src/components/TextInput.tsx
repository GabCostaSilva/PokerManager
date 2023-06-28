import {Input, VStack} from "native-base";
import React from "react";

const TextInput = ({onChangeText, value, children}) => {
    return <VStack justifyContent={"center"}>
        <Input size={"2xl"}
               mb={5}
               onChangeText={onChangeText}
               value={value}
        />
        {children}
    </VStack>;
}

export default TextInput