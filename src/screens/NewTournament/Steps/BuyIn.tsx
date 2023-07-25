import { FormControl, Select } from "native-base";
import React, { useState } from "react";
import { NumericInput } from "../../../components/NumericInput";
import FormContainer from "../FormContainer";
import { routes } from "../../../routes";


const CURRENCIES = [
  "R$",
  "$"
];

export const BuyIn = ({ setFormState, children, navigation, route }) => {
  const [state, setState] = useState({
    value: 0,
    currency: "R$"
  });

  function onChange(prop, value) {
    setState(prevState => ({ ...prevState, [prop]: value }));
    setFormState(prevState => ({ ...prevState, buyIn: state }));
  }

  function onPress() {
    navigation.navigate(routes.tournament, { screen: "Blinds" });
  }

  return (<FormContainer onPressNextPage={onPress}>
      <FormControl minW={300} mb={5}>
        <FormControl.Label _text={{ bold: true }}>{"Valor"}</FormControl.Label>
        <NumericInput
          onChangeText={value => {
            onChange("value", value);
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
