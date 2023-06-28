import React, {useState} from "react";
import {Checkbox, HStack, VStack, Text, Flex} from "native-base";

export const ShareCosts = ({setFormState, children}) => {
    const [isChecked, setIsChecked] = useState(false);

    const onChange = (isSelected) => {
        setIsChecked(isSelected)
        setFormState(prevState => ({...prevState, shareCosts: isSelected}))
    };

    return <>
        <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} w={"100%"}>
            <Checkbox value="Dividir custos de resenha?"
                      accessibilityLabel="Dividir custos de resenha?"
                      onChange={onChange}
                      size={"lg"}
            />
            <Text fontSize={20}>Dividir custos de resenha?</Text>
        </Flex>
        {children}
    </>;
};
