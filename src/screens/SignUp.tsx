import React, {useState} from "react";
import {Alert, Box, Button, Center, FormControl, Heading, Input, Text, VStack} from "native-base";
import {useAuthContext} from "../hooks/useAuthContext";

export const SignUp = ({route, navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            <Heading size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }} fontWeight="semibold">
                Bem Vindo (a)
            </Heading>
            <Heading mt="1" color="coolGray.600" _dark={{
                color: "warmGray.200"
            }} fontWeight="medium" size="xs">
                Cadastre - se para continuar
            </Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Telefone</FormControl.Label>
                    <Input
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Nome e sobrenome</FormControl.Label>
                    <Input
                        value={fullName}
                        onChangeText={text => setFullName(text)}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Nome de usuário</FormControl.Label>
                    <Input
                        value={userName}
                        onChangeText={text => setUserName(text)}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>CPF</FormControl.Label>
                    <Input
                        value={docNumber}
                        onChangeText={text => setDocNumber(text)}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Senha</FormControl.Label>
                    <Input type="password"
                           value={password}
                           onChangeText={text => setPassword(text)}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Confirme a senha</FormControl.Label>
                    <Input type="password"/>
                </FormControl>
                <Button colorScheme="primary" minW={20} mt="4" onPress={handleSignUp} disabled={isLoading}>
                    Cadastrar
                </Button>
                <Button colorScheme="primary" minW={20} mt="4" onPress={() => {
                    navigation.navigate("Login");
                }}>
                    Voltar
                </Button>
            </VStack>
            {error && <Alert w="100%" status="error">
                <Text fontSize="md" color="coolGray.800">{error}</Text>
            </Alert>}
        </Box>
    </Center>;
};
