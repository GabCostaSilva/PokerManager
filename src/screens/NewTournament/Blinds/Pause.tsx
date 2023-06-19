import {FormControl, Input, VStack} from "native-base";
import React from "react";

const Pause = () => {
    return <VStack>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Tempo"}</FormControl.Label>
            <Input/>
        </FormControl>
    </VStack>
}

export default Pause