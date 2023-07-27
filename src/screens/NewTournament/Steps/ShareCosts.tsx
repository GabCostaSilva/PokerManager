import React, { useState } from "react";
import { Checkbox, HStack, VStack, Text, Flex } from "native-base";
import FormContainer from "../FormContainer";
import { routes } from "../../../routes";

export const ShareCosts = ({ navigation, route, children }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = (isSelected) => {
    setIsChecked(isSelected);
    // setFormState(prevState => ({ ...prevState, shareCosts: isSelected }));
  };

  let onPress = () => {
    navigation.navigate(routes.tournament, { screen: "Jogadores" });
  };
  return <FormContainer onPressNextPage={onPress}>
    <Flex direction={"row"} alignItems={"center"} justifyContent={"center"} w={"100%"} mb={8}>
      <Checkbox value="Dividir custos de resenha?"
                accessibilityLabel="Dividir custos de resenha?"
                onChange={onChange}
                size={"lg"}
      />
      <Text fontSize={20} ml={5}>Dividir custos de resenha?</Text>
    </Flex>
    {children}
  </FormContainer>;
};
