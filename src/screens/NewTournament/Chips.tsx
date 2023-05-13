import {Button, Center, Circle, FormControl, Heading, Input, ScrollView, Stack, Text, VStack} from "native-base";
import React, {useState} from "react";
import {SketchPicker} from 'react-color';
import {FormField} from "../../components/Form/FormField";
import ColorPicker from "../../components/ColorPicker";
import {View} from "react-native";
import CloseableCircle from "../../components/CloseableCircle";

export function Chips({setData, formData, errors}) {
    let [chips, setChips] = useState([]);

    function addChip() {
        setChips([...chips, {color: formData.color, value: formData.chipValue}])
        setData({...formData, chips})
    }

    function handleClose(e, id) {
        setChips(chips.filter(chip => chip.value !== id))
    }

    return (
        <ScrollView>
            <VStack space="2.5" px="8" minW="300px" justifyContent='center' alignContent='center'>
                <Heading size="md">Fichas</Heading>
                <Center>
                    <FormField label='Valor'
                               formData={formData}
                               setData={setData}
                               name="chipValue"
                               placeholder=''
                               errors={errors}/>
                </Center>
                <View>
                    <ColorPicker setData={setData} formData={formData}/>
                </View>
                <VStack>
                    <Button onPress={addChip}>Adicionar</Button>
                </VStack>
                <Stack
                    flexWrap={"wrap"}
                    direction="row"
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