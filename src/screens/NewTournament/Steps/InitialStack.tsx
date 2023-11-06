import React, {useState} from "react";
import {useTourneyStore} from "../../../state/Tournament";
import {routes_names} from "../../../routes/routes_names";
import FormContainer from "../FormContainer";
import {Input} from "native-base";
import {onlyNumbers} from "../../../utils/utils";

export default ({ navigation, route }) => {
  let { initialStack } = useTourneyStore(state => state.tourney) || { initialStack: 0 };
  let patchTourney = useTourneyStore(state => state.patchTourney);

  const [value, setValue] = useState(0);

  function onPress() {
    navigation.navigate(routes_names.tournament, { screen: "Fichas" });
    patchTourney("initialStack", value);
  }

  return <FormContainer onPressNextPage={onPress}>
    {/*<NumericInput value={onlyNumbers(initialStack.toString()).toString()}*/}
    {/*              onChangeText={text => setValue(prevState => onlyNumbers(text))} />*/}
    <Input
      size={"2xl"}
      mb={5}
      keyboardType={"numeric"}
      value={initialStack ? initialStack.toString() : value.toString()}
      onChangeText={text => {
        setValue(onlyNumbers(text));
      }}
    />
  </FormContainer>;
}