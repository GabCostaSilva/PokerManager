import {Button, VStack, Text, FormControl, Input, HStack} from "native-base";
import React, {useState} from "react";

interface Blind {
    title: number,
    small: number,
    big: number,
    ante: number,
    time: number,
    pause: number
}

const NewBlind = ({setPage, setFormState, formState}) => {
    const [blind, setBlind] = useState<Blind>({
        title: 0,
        small: 0,
        big: 0,
        ante: 0,
        time: 0,
        pause: 0
    });

    return (<VStack space="md">
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Número"}</FormControl.Label>
            <Input
                onChangeText={(value) => {
                    setBlind({...blind, title: Number.parseInt(value)})
                }}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Small"}</FormControl.Label>
            <Input onChangeText={(value) => {
                setBlind({...blind, small: Number.parseInt(value)})
            }}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Big"}</FormControl.Label>
            <Input onChangeText={(value) => {
                setBlind({...blind, big: Number.parseInt(value)})
            }}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Ante"}</FormControl.Label>
            <Input onChangeText={(value) => {
                setBlind({...blind, ante: Number.parseInt(value)})
            }}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Tempo (em segundos)"}</FormControl.Label>
            <Input onChangeText={(value) => {
                setBlind({...blind, time: Number.parseInt(value)})
            }}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Tempo de Pausa (em minutos)"}</FormControl.Label>
            <Input onChangeText={(value) => {
                setBlind({...blind, time: Number.parseInt(value)})
            }}
            />
        </FormControl>

        <HStack justifyContent='center' space='md'>
            <Button
                variant="outline"
                onPress={() => {
                    setPage(currPage => currPage - 1)
                }}>
                <Text>
                    Cancelar
                </Text>
            </Button>

            <Button
                onPress={() => {
                    setFormState({...formState, blinds: [...formState.blinds, blind]})
                    setPage(currPage => currPage - 1)
                }}>
                <Text color="white">
                    Adicionar
                </Text>
            </Button>
        </HStack>
    </VStack>)
}

export default NewBlind