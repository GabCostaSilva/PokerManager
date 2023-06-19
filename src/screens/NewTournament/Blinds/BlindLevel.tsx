import {FormControl, Input, VStack} from "native-base";
import React from "react";

const BlindLevel = ({setPage}) => {
    return (<VStack>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Número"}</FormControl.Label>
            <Input/>
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Small"}</FormControl.Label>
            <Input/>
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Big"}</FormControl.Label>
            <Input/>
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Ante"}</FormControl.Label>
            <Input/>
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Tempo"}</FormControl.Label>
            <Input/>
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Tempo de Pausa"}</FormControl.Label>
            <Input/>
        </FormControl>
    </VStack>)
}
export default BlindLevel