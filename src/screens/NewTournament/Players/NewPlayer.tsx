import {Button, FormControl, Heading, HStack, ScrollView, Text} from "native-base";
import {NumericInput} from "../../../components/NumericInput";
import React, {useState} from "react";
import {Player} from "../index";

interface NewPlayerProps {
    setIsNewPlayer: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export const NewPlayer = ({formState, setFormState, setIsNewPlayer}) => {
    let initialState = {
        name: "",
        phoneNumber: "",
        email: "",
        docNumber: "",
        pix: "",
        bank: "",
        bankAgency: "",
        bankAccountNumber: "",
        picPay: ""
    };
    const [player, setPlayer] = useState<Player>(initialState);

    function resetState() {
        setIsNewPlayer(false)
        setPlayer(initialState)
    }

    return (<ScrollView>
        <Heading>Novo Jogador</Heading>
        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Nome"}</FormControl.Label>
            <NumericInput
                onChangeText={(value) => {
                    setPlayer({...player, name: value})
                }}
                value={player.name}
            />
        </FormControl>

        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Telefone"}</FormControl.Label>
            <NumericInput
                onChangeText={(value) => {
                    setPlayer({...player, phoneNumber: value})
                }}
                value={player.phoneNumber}
            />
        </FormControl>

        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Email"}</FormControl.Label>
            <NumericInput
                onChangeText={(value) => {
                    setPlayer({...player, email: value})
                }}
                value={player.email}
            />
        </FormControl>

        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"CPF"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setPlayer({...player, docNumber: value})
            }} value={player.docNumber}
            />
        </FormControl>

        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Pix"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setPlayer({...player, pix: value})
            }} value={player.pix}
            />
        </FormControl>

        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Banco"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setPlayer({...player, bank: value})
            }} value={player.bank}
            />
        </FormControl>

        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Agência"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setPlayer({...player, bankAgency: value})
            }} value={player.bankAgency}
            />
        </FormControl>

        <FormControl>
            <FormControl.Label _text={{bold: true}}>{"Número da conta"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setPlayer({...player, bankAccountNumber: value})
            }} value={player.bankAccountNumber}
            />
        </FormControl>

        <FormControl mb={5}>
            <FormControl.Label _text={{bold: true}}>{"PicPay"}</FormControl.Label>
            <NumericInput onChangeText={(value) => {
                setPlayer({...player, picPay: value})
            }} value={player.picPay}
            />
        </FormControl>

        <HStack justifyContent='center' space='md' mb={5}>
            <Button
                variant="outline"
                onPress={() => {
                    resetState();
                }}>
                <Text>
                    Cancelar
                </Text>
            </Button>

            <Button
                onPress={() => {
                    setFormState({...formState, players: [...formState.players, player]})
                    resetState()
                }}>
                <Text color="white">
                    Adicionar
                </Text>
            </Button>
        </HStack>
    </ScrollView>);
};