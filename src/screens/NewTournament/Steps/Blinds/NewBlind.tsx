import { Button, FormControl, HStack, Text } from "native-base";
import React, { useState } from "react";
import { NumericInput } from "../../../../components/NumericInput";
import { onlyNumbers } from "../../../../utils";

interface Blind {
    title: number,
    small: number,
    big: number,
    ante: number,
    time: number,
    pause: number
}

const NewBlind = () => {
    const [blind, setBlind] = useState<Blind>({
        title: 0,
        small: 0,
        big: 0,
        ante: 0,
        time: 0,
        pause: 0
    });

    return (<>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Número"}</FormControl.Label>
            <NumericInput
                onChangeText={(value) => {
                    setBlind({...blind, title: onlyNumbers(value)})
                }}
                value={onlyNumbers(blind.title.toString()).toString()}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Small"}</FormControl.Label>
            <NumericInput
                onChangeText={(value) => {
                    setBlind({...blind, small: onlyNumbers(value)})
                }}
                value={onlyNumbers(blind.small.toString()).toString()}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Big"}</FormControl.Label>
            <NumericInput
                onChangeText={(value) => {
                    setBlind({...blind, big: onlyNumbers(value)})
                }}
                value={onlyNumbers(blind.big.toString()).toString()}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Ante"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setBlind({...blind, ante: onlyNumbers(value)})
            }} value={onlyNumbers(blind.ante.toString()).toString()}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Tempo (em segundos)"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setBlind({...blind, time: onlyNumbers(value)})
            }} value={onlyNumbers(blind.time.toString()).toString()}
            />
        </FormControl>
        <FormControl mb={8}>
            <FormControl.Label _text={{bold: true}}>{"Tempo de Pausa (em minutos)"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setBlind({...blind, pause: onlyNumbers(value)})
            }} value={onlyNumbers(blind.pause.toString()).toString()}
            />
        </FormControl>

        <HStack justifyContent='center' space='md'>
            <Button
                variant="outline"
                onPress={() => {

                }}>
                <Text>
                    Cancelar
                </Text>
            </Button>

            <Button
                onPress={() => {

                }}>
                <Text color="white">
                    Adicionar
                </Text>
            </Button>
        </HStack>
    </>)
}

export default NewBlind