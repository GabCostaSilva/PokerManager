import {Button, Center, CheckIcon, Heading, ScrollView, Select, Stack, Text, VStack} from "native-base";
import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {FormField} from "../../../components/Form/FormField";
import CloseableCircle from "../../../components/CloseableCircle";
import colors from "./colors";

export function Chips({setData, formData, errors}) {
    const baseChips = []

    const [chips, setChips] = useState(baseChips);
    const [chipColor, setChipColor] = useState(null);
    const [chipValue, setChipValue] = useState(0);

    useEffect(() => {
        return () => {
            console.log("color:", chipColor, "value:", chipValue, "current:", chips)
        };
    }, [chipColor, chipValue]);


    function addChip() {
        setChips([...chips, {color: chipColor, value: chipValue}])
        setData({...formData, chips})
        setChipValue(null)
    }

    function handleClose(e, id) {
        setChips(chips.filter(chip => chip.value !== id))
    }

    return (
        <ScrollView>
            <VStack space="2.5" px="8" minW="400px" justifyContent='center' alignContent='center'>
                <Heading size="md">Fichas</Heading>
                <FormField label='Valor'
                           formData={chipValue}
                           setData={setChipValue}
                           name="chipValue"
                           placeholder=''
                           value={chipValue}
                           errors={errors}/>

                <View>
                    <Select selectedValue={chipColor} minWidth="200" accessibilityLabel="Escolha a cor."
                            placeholder="Escolha a cor."
                            _selectedItem={{
                                bg: chipColor,
                                endIcon: <CheckIcon size="5"/>
                            }}
                            mt={1}
                            onValueChange={itemValue => setChipColor(itemValue)}>
                        {colors.map((color, i) => {
                            return <Select.Item key={i} label={color.name} value={color.value}/>
                        })}
                    </Select>
                </View>
                <VStack>
                    <Button onPress={addChip}>Adicionar</Button>
                </VStack>
                <Stack
                    flexWrap={"wrap"}
                    direction="row"
                    justifyContent={"center"}
                    space={3}>
                    {chips.map((chip, i) => {
                        return (<CloseableCircle size="40px"
                                                 bg={chip.color}
                                                 shadow="9"
                                                 handleClose={(e) => handleClose(e, chip.value)}
                                                 key={i}>
                            <Text color={"white"} bold borderColor={"black"}>R${chip.value}</Text>
                        </CloseableCircle>)
                    })}
                </Stack>
            </VStack>
        </ScrollView>
    );
}