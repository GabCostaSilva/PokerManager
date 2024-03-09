import React, {useState} from "react";
import {Box, Center} from "native-base";
import {
    Button,
    ButtonGroup,
    ButtonSpinner,
    ButtonText,
    FormControl,
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
import * as yup from "yup";
import {ValidationError} from "yup";

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
    const {register, isLoading, getErrorMessage} = useAuthContext();
    const toast = useToast();
    const showToast = useShowToast(toast);

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [state, setState] = useState(initialState)
    const [validationErrors, setValidationErrors] = useState({} as Record<string, string[]>)

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Por favor, insira um e-mail válido")
            .required('E-mail é obrigatório'),
        phoneNumber: yup.string().required('Telefone é obrigatório'),
        name: yup.string().required('Nome é obrigatório'),
        password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve conter ao menos 6 caracteres'),
        userName: yup.string().required('Nome de usuário é obrigatório'),
        docNumber: yup.string().required('CPF é obrigatório')
    })

    function cleanupForm() {
        setValidationErrors({} as Record<string, string[]>)
    }

    async function handleSignUp() {
        cleanupForm();
        try {
            const userData = {...state, password};
            validationSchema.validateSync(userData, {abortEarly: false});

            await register({
                ...userData,
                phoneNumber: "+55" + userData.phoneNumber.replace(/\D/g, "")
            });

            navigation.navigate("Login", {message: "Usuário cadastrado com sucesso!"});

        } catch (e) {
            if (e.name === "ValidationError") {
                e.inner.forEach((error: ValidationError) => {
                    showToast("Verifique os campos do cadastro")
                    setValidationErrors((prev) => ({...prev, [error.path]: error.errors}))
                })
            } else {
                showToast("Erro ao cadastrar usuário")
                console.error("Error: in catch", JSON.stringify(e, null, 2), getErrorMessage())
            }
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
                    <UserBasicInfoForm state={state} setState={setState} errors={validationErrors}>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Senha
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput
                                name={"password"}
                                value={password}
                                errors={validationErrors.password}
                                onChangeText={(password: string) => setPassword(password)}
                                isPassword={true}/>
                        </FormControl>
                        <FormControl mb={"$4"}>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Confirme sua senha
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput isPassword={true}
                                       value={passwordConfirmation}
                                       onChangeText={setPasswordConfirmation}/>
                        </FormControl>
                        <ButtonGroup flexDirection={"column"}>
                            <Button action={"positive"}
                                    onPress={() => {
                                        handleSignUp();
                                    }}
                                    disabled={isLoading}>
                                <ButtonText>Cadastrar</ButtonText>
                                {isLoading && <ButtonSpinner pl={"$4"}/>}
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
