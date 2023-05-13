import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {
    Container,
    Center,
    Text,
    Heading,
    Input,
    Icon,
    KeyboardAvoidingView,
    Pressable,
    Button,
    Flex,
    Spacer
} from 'native-base';
import {Feather} from '@expo/vector-icons';

const VALID_EMAIL_EXPRESSION = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

export function SignIn() {
    let handleUserRegister = () => {

    };
    return (
        <Center flex={1}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <Container>
                        <Heading w={"130%"}>Poker<Text color="emerald.500">Manager</Text></Heading>
                        <Flex alignItems="space-between">
                            <Input
                                mt="5"
                                p="2"
                                w={{
                                    base: "130%",
                                    md: "35%"
                                }}
                                InputLeftElement={<Icon as={<Feather name="mail"/>} size={5} ml="2" color="muted.400"/>}
                                placeholder="E-Mail"/>
                            <Input
                                p="2"
                                mt="5"
                                w={{
                                    base: "130%",
                                    md: "35%"
                                }}
                                placeholder="Senha"
                                InputLeftElement={<Icon as={<Feather name="lock"/>} size={5} ml="2" color="muted.400"/>}
                                secureTextEntry
                            />
                            <Flex flexDir="row">
                                <Button mt="5">Cadastrar</Button>
                                <Button mt="5">Entrar</Button>
                            </Flex>

                        </Flex>
                    </Container>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Center>
    );
}