import React from "react";

import { Input } from "native-base";
import { useTourneyStore } from "../../../state/Tournament";
import { routes } from "../../../routes";
import FormContainer from "../FormContainer";

export default ({ navigation, route }) => {
  let { initialStack } = useTourneyStore(
    state => state.tourney) || { initialStack: 0 };
  let patchTourney = useTourneyStore(state => state.patchTourney);

  function onPress() {
    navigation.navigate(routes.tournament, { screen: "Fichas" });
  }

  return <FormContainer onPressNextPage={onPress}>
    <Input size={"2xl"}
           mb={5}
           placeholder={"0"}
           keyboardType="numeric"
           value={initialStack.toString()}
           onChangeText={text => patchTourney("initialStack", text)}
    />
  </FormContainer>;
}