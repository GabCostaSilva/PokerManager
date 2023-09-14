import React, { useState } from "react";
import { Checkbox, HStack, VStack, Text, Flex } from "native-base";
import FormContainer from "../FormContainer";
import { routes_names } from "../../../routes/routes_names";
import { useTourneyStore } from "../../../state/Tournament";

export const ShareCosts = ({ navigation, route, children }) => {
  let { shareCosts } = useTourneyStore(state => state.tourney);
  let patchTourney = useTourneyStore(state => state.patchTourney);

  const [isChecked, setIsChecked] = useState(shareCosts);

  const onChange = (isSelected: boolean) => {
    setIsChecked(isSelected);
  };

  let onPress = () => {
    patchTourney("shareCosts", shareCosts);
    navigation.navigate(routes_names.tournament, { screen: "Jogadores" });
  };

  return <FormContainer onPressNextPage={onPress}>
    <Flex direction={"row"} alignItems={"center"} justifyContent={"center"} w={"100%"} mb={8}>
      <Checkbox value="Dividir custos de resenha?"
                accessibilityLabel="Dividir custos de resenha?"
                onChange={onChange}
                size={"lg"}
                isChecked={isChecked}
      />
      <Text fontSize={20} ml={5}>Dividir custos de resenha?</Text>
    </Flex>
    {children}
  </FormContainer>;
};
