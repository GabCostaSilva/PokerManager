import React, {useState} from "react";
import {Alert, Box, Button, Center, VStack} from "native-base";
import {useAuthContext} from "../hooks/useAuthContext";
import TextInput from "../components/TextInput";
import {Heading, FormControl, Text, FormControlLabelText, FormControlLabel} from "@gluestack-ui/themed";
import {PhoneInput} from "../components/inputs/PhoneInput";

export const SignUp = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [docNumber, setDocNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // @ts-ignore
    const {register, error, isLoading} = useAuthContext();

    async function handleSignUp() {
        await register({
            name: fullName,
            userName,
            email,
            phoneNumber,
            docNumber,
            password
        });
        if (!error)
            navigation.navigate("Login");
    }

    return <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size="lg" fontWeight="600">
                Boas vindas ao Poker Dealer!
            </Heading>
            <Heading fontWeight="400" size="xs">
                Cadastre-se para continuar
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>
                            Email
                        </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>
                            Telefone para contato (com DDD)
                        </FormControlLabelText>
                    </FormControlLabel>
                    <PhoneInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>
                            Nome completo
                        </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>
                            Nome de usuário
                        </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput
                        value={userName}
                        onChangeText={setUserName}
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>
                            CPF
                        </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput
                        value={docNumber}
                        onChangeText={setDocNumber}
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>
                            Senha
                        </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        isPassword={true}
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>
                            Confirme sua senha
                        </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput isPassword={true} value={passwordConfirmation} onChangeText={setPasswordConfirmation}/>
                </FormControl>
                <Button colorScheme="primary" minW={20} mt="4" onPress={handleSignUp} disabled={isLoading}>
                    Cadastrar
                </Button>
                <Button colorScheme="primary" minW={20} mt="4"
                        onPress={() => {
                            navigation.navigate("Login");
                        }}>
                    Voltar
                </Button>
            </VStack>
            {error && <Alert w="100%" status="error">
                <Text size="md">{error}</Text>
            </Alert>}
        </Box>
    </Center>;
};
