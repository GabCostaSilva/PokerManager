import {CheckIcon, FormControl, Input, Select, Text, VStack} from "native-base";
import {NumericInput} from "../../components/NumericInput";
import {onlyNumbers} from "../../utils";
import React, {ReactElement, useState} from "react";
import StepsButtonGroup from "../../components/StepsButtonGroup";
import colors from "./Chips/colors";


const CURRENCIES = [
    "R$",
    "$"
]

interface BuyInProps {
    children: ReactElement
}

export const BuyIn = ({children}: BuyInProps) => {
    const [state, setState] = useState({
        value: 0,
        currency: "R$"
    });

    function onChange(prop, value) {
        setState(prevState => ({...prevState, [prop]: value}))
    }

    return (<>
            <FormControl>
                <FormControl.Label _text={{bold: true}}>{"Valor"}</FormControl.Label>
                <NumericInput
                    onChangeText={value => {
                        onChange("value", value)
                    }}
                />
            </FormControl>
            <FormControl>
                <FormControl.Label _text={{bold: true}}>{"Moeda"}</FormControl.Label>
                <Select selectedValue={state.currency} minWidth="200" accessibilityLabel="Escolha a moeda"
                        placeholder="Escolha a moeda"
                        size={"2xl"}
                        onValueChange={value => {
                            onChange("currency", value)
                        }}>
                    {CURRENCIES.map((currency, i) => {
                        return <Select.Item key={i} label={currency} value={currency}/>
                    })}
                </Select>
            </FormControl>
            {children}
        </>
    );
};
