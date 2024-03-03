import React, {useState} from "react";
import {Box, Center} from "native-base";
import {
    Button,
    ButtonGroup,
    ButtonSpinner,
    ButtonText,
    FormControl,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText,
    Heading,
    useToast
} from "@gluestack-ui/themed";
import TextInput from "../../components/TextInput";
import {useAuthContext} from "../../hooks/useAuthContext";
import {KeyboardAvoidingView, ScrollView} from "react-native";
import {UserBasicInfoForm} from "../../components/UserBasicInfoForm";
import {useShowToast} from "../../hooks/useShowToast";

const initialState = {
    name: "",
    userName: "",
    phoneNumber: "",
    email: "",
    docNumber: "",
    pix: "",
    bank: "",
    bankAgency: "",
    bankAccountNumber: "",
    picPay: "",
    password: "",
}

export const SignUp = ({navigation}) => {
    const {register, error, isLoading} = useAuthContext();
    const toast = useToast();
    const showToast = useShowToast(toast);

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [state, setState] = useState(initialState)

    async function handleSignUp() {
        try {
            await register({...state, password});

            if (null == error)
                navigation.navigate("Login");
            else {
                console.error("Error: ", error)
                showToast("Erro ao cadastrar usuário")
            }
        } catch (e) {
            console.error("Error: ", error)
            showToast("Erro ao cadastrar usuário")
        }
    }

    return <ScrollView>
        <KeyboardAvoidingView>
            <Center w="100%">
                <Box safeArea p="2" w="90%" maxW="290" py="4">
                    <Heading size="lg" fontWeight="600">
                        Boas vindas ao Poker Dealer!
                    </Heading>
                    <Heading fontWeight="400" size="xs" mb={"$4"}>
                        Cadastre-se para continuar
                    </Heading>
                    <UserBasicInfoForm
                        state={state}
                        setState={setState}>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Senha
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                isPassword={true}/>
                            <FormControlHelper>
                                <FormControlHelperText>
                                    Deve conter ao menos 6 caracteres.
                                </FormControlHelperText>
                            </FormControlHelper>
                        </FormControl>
                        <FormControl mb={"$4"}>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Confirme sua senha
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput isPassword={true} value={passwordConfirmation}
                                       onChangeText={setPasswordConfirmation}/>
                        </FormControl>
                        <ButtonGroup flexDirection={"column"}>
                            <Button action={"positive"} onPress={handleSignUp}
                                    disabled={isLoading}>
                                <ButtonText>Cadastrar</ButtonText>
                                {isLoading && <ButtonSpinner/>}
                            </Button>
                            <Button action={"negative"}
                                    variant={"outline"}
                                    onPress={() => {
                                        navigation.navigate("Login");
                                    }}>
                                <ButtonText>Cancelar</ButtonText>
                            </Button>
                        </ButtonGroup>
                    </UserBasicInfoForm>
                </Box>
            </Center>
        </KeyboardAvoidingView>
    </ScrollView>;
};
