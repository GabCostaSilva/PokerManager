import {Box, Center, FormControl, Heading, HStack, Input, Link, Text, VStack} from "native-base";
import React, {ReactElement, useEffect, useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {routes_names} from "../../routes/routes_names";
import {Button, ButtonSpinner, ButtonText} from "@gluestack-ui/themed";
import {useShowToast} from "../../hooks/useShowToast";

function _getErrorMessage(e: { message: string; }) {
    const {message} = e;
    if (message.includes("session-not-found") || message.includes("session-cookie-expired"))
        return "Faça login novamente para continuar.";

    else if (message.includes("email-already-in-use"))
        return "Email já em uso."

    else if (message.includes("user-not-found"))
        return "Usuário não encontrado."

    else if (message.includes("weak-password"))
        return "A senha deve conter ao menos 6 caracteres.";

    else if (message.includes("wrong-password"))
        return "Senha incorreta. Tente novamente com outra senha.";

    else if (message.includes("missing-password"))
        return "Digite sua senha para entrar.";

    else if (message.includes("invalid-email"))
        return "Email inválido. Tente novamente com outro email.";

    else
        return "Erro ao processar operação. Tente novamente daqui alguns momentos.";
}

const Login = ({route, navigation}): ReactElement => {
    const {params: routeParams} = route;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const authContext = useAuthContext();

    const showToast = useShowToast();

    useEffect(() => {
        if (routeParams && routeParams.message) {
            showToast(routeParams.message, 'success');
        }
        if (authContext.isSignedIn) {
            navigation.navigate(routes_names.home);
        }

    }, [authContext.isSignedIn, route]);

    const handleLogin = async () => {
        try {
            await authContext.login(email, password);
            navigation.navigate(routes_names.home);
        } catch (e) {
            showToast(_getErrorMessage(e), 'error');
        }
    };

    return <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }}>
                Bem Vindo ao Poker Manager
            </Heading>
            <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                Faça seu login para continuar!
            </Heading>

            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                        onChangeText={(text) => setEmail(prevState => text)}
                        autoCapitalize={"none"}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Senha</FormControl.Label>
                    <Input type="password" onChangeText={(text) => setPassword(prevState => text)}/>
                    <Link _text={{
                        fontSize: "xs",
                        fontWeight: "500",
                        color: "indigo.500"
                    }} alignSelf="flex-end" mt="1"
                          href="#"
                          onPress={() => navigation.navigate(routes_names.password_recovery)}>
                        Esqueceu sua senha?
                    </Link>
                </FormControl>
                <Button marginTop="$2" onPress={handleLogin}>
                    <ButtonText>Entrar</ButtonText>
                    {authContext.isLoading && <ButtonSpinner/>}
                </Button>
                <HStack mt="6" justifyContent="center">
                    <Text fontSize="sm" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }}>
                        Sou um novo usuário.{" "}
                    </Text>
                    <Link _text={{
                        color: "indigo.500",
                        fontWeight: "medium",
                        fontSize: "sm"
                    }}
                          href="#"
                          onPress={() => navigation.navigate(routes_names.signUp)}>
                        Cadastre-Se
                    </Link>
                </HStack>
            </VStack>
        </Box>
    </Center>;
};

export default Login;
