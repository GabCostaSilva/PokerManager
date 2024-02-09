import {FormControl, HStack, Text} from "native-base";
import React, {useState} from "react";
import {NumericInput} from "../../../../components/NumericInput";
import {onlyNumbers} from "../../../../utils/utils";
import {Blind, useTourneyStore} from "../../../../state/Tournament";
import {Button, ButtonText} from "@gluestack-ui/themed";

const NewBlind = ({setModalVisible}) => {
    let addBlind = useTourneyStore(state => state.addBlind);
    let initialState = {
        title: 0,
        small: 0,
        big: 0,
        ante: 0,
        time: 0,
        durationInMinutes: 0,
        stopGameAfterEnd: false,
        isPause: false
    };
    const [blind, setBlind] = useState<Blind>(initialState);

    return (<>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Small"}</FormControl.Label>
            <NumericInput
                onChangeText={(value) => {
                    const small = onlyNumbers(value);
                    setBlind({...blind, small: small, big: 2 * small});
                }}
                value={onlyNumbers(blind.small.toString()).toString()}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Big"}</FormControl.Label>
            <NumericInput
                onChangeText={(value) => {
                    setBlind({...blind, big: onlyNumbers(value)});
                }}
                value={onlyNumbers(blind.big.toString()).toString()}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Ante"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setBlind({...blind, ante: onlyNumbers(value)});
            }} value={onlyNumbers(blind.ante.toString()).toString()}
            />
        </FormControl>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Tempo (em minutos)"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setBlind({...blind, time: onlyNumbers(value)});
            }} value={onlyNumbers(blind.time.toString()).toString()}
            />
        </FormControl>

        <HStack justifyContent="center" space="md">
            <Button
                variant="outline"
                action="negative"
                onPress={() => {
                    setModalVisible(prevState => false);
                }}>
                <ButtonText>
                    Cancelar
                </ButtonText>
            </Button>

            <Button
                onPress={() => {
                    addBlind(blind);
                    setBlind(prevState => (initialState));
                    setModalVisible(false);
                }}>
                <ButtonText color="white">
                    Adicionar
                </ButtonText>
            </Button>
        </HStack>
    </>);
};

export default NewBlind;