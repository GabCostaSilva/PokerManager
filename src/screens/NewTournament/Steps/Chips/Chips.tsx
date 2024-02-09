import React, {useState} from "react";
import {CheckIcon, FormControl, Input, Select, Stack, Text} from "native-base";
import CloseableCircle from "../../../../components/CloseableCircle";
import {colors} from "./colors";
import FormContainer from "../../FormContainer";
import {Chip, useTourneyStore} from "../../../../state/Tournament";
import {routes_names} from "../../../../routes/routes_names";

function Chips({navigation, route}) {
    let {chips} = useTourneyStore(state => state.tourney) || {chips: []}
    let patchTourney = useTourneyStore(state => state.patchTourney);

    const [_chips, setChips] = useState<Chip[]>(chips || []);
    const [chipColor, setChipColor] = useState("");
    const [chipValue, setChipValue] = useState("");

    function findChip(chip: { color: string; value: string; }) {
        return _chips.find(_chip =>
            chip.color === _chip.color || parseInt(chip.value) === _chip.value);
    }

    function handleClose(e: any, chipToClose: Chip) {
        let filteredChips = _chips.filter(chip =>
            chip.value !== chipToClose.value && chip.color !== chipToClose.color);
        setChips(filteredChips);
    }

    function resetChip() {
        setChipColor("");
        setChipValue("");
    }

    function handleSelect(colorValue: any) {
        if (_chips.length >= 10) {
            alert("É permitido no máximo 10 fichas.");
            return;
        }

        const chip = {color: colorValue, value: chipValue};
        if (findChip(chip)) {
            resetChip();
            return;
        }
        setChips(prevState => ([...prevState, {...chip, value: parseInt(chip.value)}]));
        resetChip();
    }

    function onlyNumbers(text: string) {
        return text?.replace(/[^0-9]/g, "");
    }

    function onPress() {
        patchTourney("chips", _chips);
        navigation.navigate(routes_names.tournament, {screen: "Buy In"});
    }

    return <FormContainer onPressNextPage={onPress}>
        <FormControl minWidth="300" mb={5}>
            <FormControl.Label _text={{bold: true}}>Valor</FormControl.Label>
            <Input
                size={"2xl"}
                keyboardType="numeric"
                value={chipValue}
                onChangeText={text => {
                    setChipValue(onlyNumbers(text));
                }}
                maxLength={4}
            />
        </FormControl>
        <FormControl mb={5}>
            <FormControl.Label _text={{bold: true}}>Cor</FormControl.Label>
            <Select selectedValue={chipColor} minWidth="300" accessibilityLabel="Escolha a cor"
                    isDisabled={chipValue === "" || chipValue === null || chipValue === undefined}
                    placeholder="Escolha a cor"
                    size={"2xl"}
                    _selectedItem={{
                        bg: chipColor,
                        endIcon: <CheckIcon size="5"/>
                    }}
                    onValueChange={handleSelect}>
                {colors.map((color: { name: string; value: string; }, i: React.Key) => {
                    return <Select.Item key={i} label={color.name} value={color.value}/>;
                })}
            </Select>
        </FormControl>
        <Stack
            flexWrap={"wrap"}
            direction="row"
            justifyContent={"center"}
            mb={5}
            space={3}>
            {_chips.map((chip, i) => {
                return (<CloseableCircle
                                         bg={chip.color}
                                         shadow="9"
                                         handleClose={(e: any) => handleClose(e, chip)}
                                         key={i}>
                    <Text color={"white"} bold borderColor={"black"}>{chip.value}</Text>
                </CloseableCircle>);
            })}
        </Stack>
    </FormContainer>;
}

export default Chips;