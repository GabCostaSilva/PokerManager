import React, {useEffect, useState} from 'react';
import CloseableCircle from "../../../components/CloseableCircle";
import {CheckIcon, FormControl, Input, Select, Stack, Text, VStack} from "native-base";
import colors from "./colors";
import StepsButtonGroup from "../../../components/StepsButtonGroup";

interface Chip {
    color: string,
    value: string
}

function Chips({setPage, pages, currentPage, setFormState, formState}) {
    const [_chips, set_chips] = useState<Chip[]>([]);

    const [chipColor, setChipColor] = useState("");
    const [chipValue, setChipValue] = useState("");

    function findChip(chip) {
        return _chips.find(_chip => chip.color === _chip.color || chip.value === _chip.value)
    }

    function handleClose(e, chipToClose) {
        let filteredChips = _chips.filter(chip => chip.value !== chipToClose.value &&
            chip.color !== chipToClose.color);
        set_chips(filteredChips)
    }

    function resetChip() {
        setChipColor("")
        setChipValue("")
    }

    function handleSelect(colorValue) {
        if (_chips.length >= 10) {
            alert("É permitido no máximo 10 fichas.")
            return;
        }

        const chip = {color: colorValue, value: chipValue};
        if (findChip(chip)) {
            resetChip()
            return
        }
        set_chips(prevState => ([...prevState, chip]))
        resetChip();
    }

    function onlyNumbers(text: string) {
        return text?.replace(/[^0-9]/g, '');
    }

    return <>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>Valor</FormControl.Label>
            <Input
                size={"2xl"}
                keyboardType='numeric'
                value={chipValue}
                onChangeText={text => {
                    setChipValue(onlyNumbers(text))
                }}
                maxLength={4}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>Cor</FormControl.Label>
            <Select selectedValue={chipColor} minWidth="200" accessibilityLabel="Escolha a cor"
                    isDisabled={chipValue === "" || chipValue === null || chipValue === undefined}
                    placeholder="Escolha a cor"
                    size={"2xl"}
                    _selectedItem={{
                        bg: chipColor,
                        endIcon: <CheckIcon size="5"/>
                    }}
                    onValueChange={handleSelect}>
                {colors.map((color, i) => {
                    return <Select.Item key={i} label={color.name} value={color.value}/>
                })}
            </Select>
        </FormControl>
        <Stack
            flexWrap={"wrap"}
            direction="row"
            justifyContent={"center"}
            space={3}>
            {_chips.map((chip, i) => {
                return (<CloseableCircle size="40px"
                                         bg={chip.color}
                                         shadow="9"
                                         handleClose={(e) => handleClose(e, chip)}
                                         key={i}>
                    <Text color={"white"} bold borderColor={"black"}>{chip.value}</Text>
                </CloseableCircle>)
            })}
        </Stack>
        <StepsButtonGroup setPage={setPage}
                          pages={pages}
                          currentPage={currentPage}
                          functions={[
                              () => {
                                    setFormState(_formState => ({..._formState, chips: [..._chips]}))
                              },
                          ]}/>
    </>;
}

export default Chips;