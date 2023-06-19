import {Button, CheckIcon, Heading, Select, Stack, Text, VStack} from "native-base";
import React, {useState} from "react";
import {View} from "react-native";
import {FormField} from "../../../components/Form/FormField";
import CloseableCircle from "../../../components/CloseableCircle";
import colors from "./colors";
import StepsButtonGroup from "../../../components/StepsButtonGroup";

interface ChipsProps {
    pages: any
}

interface ChipsProps {
    currentPage: any
}

export function Chips({ setData, setPage, formData, errors, pages, currentPage }) {
    const baseChips = []

    const [chips, setChips] = useState(baseChips);
    const [chipColor, setChipColor] = useState(null);
    const [chipValue, setChipValue] = useState(0);

    function addChip() {
        if (chips.length >= 10) {
            alert("É permitido no máximo 10 fichas.")
            return;
        }
        setChips([...chips, {color: chipColor, value: chipValue}])
        setData({...formData, chips: [...chips, {color: chipColor, value: chipValue}]})
        setChipValue(null)
    }

    function handleClose(e, id) {
        setChips(chips.filter(chip => chip.value !== id))
    }

    return (
        <VStack space="2.5" minW={"250"} justifyContent='center' alignContent='center'>
            <Heading size="md">Fichas</Heading>
            <FormField label='Valor'
                       formData={chipValue.toString()}
                       setData={setChipValue}
                       name="chipValue"
                       placeholder=''
                       value={chipValue.toString()}
                       errors={errors}/>

            <View>
                <Select selectedValue={chipColor} minWidth="200" accessibilityLabel="Escolha a cor."
                        placeholder="Escolha a cor."
                        size={"lg"}
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
                        <Text color={"white"} bold borderColor={"black"}>{chip.value}</Text>
                    </CloseableCircle>)
                })}
            </Stack>
            <StepsButtonGroup setPage={setPage} pages={pages} currentPage={currentPage}/>
        </VStack>
    );
}