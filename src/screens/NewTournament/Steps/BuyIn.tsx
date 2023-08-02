import { FormControl, Input, Select } from "native-base";
import React, { useState } from "react";
import { NumericInput } from "../../../components/NumericInput";
import FormContainer from "../FormContainer";
import { routes } from "../../../routes";
import { onlyNumbers } from "../../../utils";
import { useTourneyStore } from "../../../state/Tournament";


const CURRENCIES = [
  "R$",
  "$"
];

export const BuyIn = ({ children, navigation, route }) => {
  let { buyIn } = useTourneyStore(state => state.tourney);
  let patchTourney = useTourneyStore(state => state.patchTourney);

  const [state, setState] = useState(buyIn || {value: 0, currency: ""});

  function onChange(prop: string, value: string) {
    setState(prevState => ({ ...prevState, [prop]: value }));
  }

  function onPress() {
    patchTourney("buyIn", state);
    navigation.navigate(routes.tournament, { screen: "Blinds" });
  }

  return (<FormContainer onPressNextPage={onPress}>
      <FormControl minW={300} mb={5}>
        <FormControl.Label _text={{ bold: true }}>{"Valor"}</FormControl.Label>
        <Input
          size={"2xl"}
          mb={5}
          keyboardType={"numeric"}
          value={onlyNumbers(state.value.toString()).toString()}
          onChangeText={text => {
            setState(prevState => ({ ...prevState, value: onlyNumbers(text) }));
          }}
        />
      </FormControl>
      <FormControl minW={300} mb={5}>
        <FormControl.Label _text={{ bold: true }}>{"Moeda"}</FormControl.Label>
        <Select selectedValue={state.currency} minWidth="200" accessibilityLabel="Escolha a moeda"
                placeholder="Escolha a moeda"
                size={"2xl"}
                onValueChange={value => {
                  onChange("currency", value);
                }}>
          {CURRENCIES.map((currency, i) => {
            return <Select.Item key={i} label={currency} value={currency} />;
          })}
        </Select>
      </FormControl>
      {children}
    </FormContainer>
  );
};
