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
import {Formik} from "formik";
import * as yup from "yup";
import {InputErrorLabel} from "../../components/inputs/InputErrorLabel";

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
    const {register, error, isLoading, getErrorMessage} = useAuthContext();
    const toast = useToast();
    const showToast = useShowToast(toast);

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [state, setState] = useState(initialState)

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Por favor, insira um e-mail válido")
            .required('E-mail é obrigatório'),
        phoneNumber: yup.string().required('Telefone é obrigatório'),
        name: yup.string().required('Nome é obrigatório'),
        password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve conter ao menos 6 caracteres'),
        username: yup.string().required('Nome de usuário é obrigatório'),
        docNumber: yup.string().required('CPF é obrigatório')
    })

    async function handleSignUp() {
        try {
            await register({...state, password});

            if (null == getErrorMessage())
                navigation.navigate("Login");
            else {
                console.error("Error: ", getErrorMessage())
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
                    <Formik
                        initialValues={initialState}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            await handleSignUp();
                        }}
                    >{({
                           handleSubmit,
                           errors
                       }) => (
                        <UserBasicInfoForm state={state} setState={setState} errors={errors}>
                            <FormControl>
                                <FormControlLabel>
                                    <FormControlLabelText>
                                        Senha
                                    </FormControlLabelText>
                                </FormControlLabel>
                                <TextInput
                                    name={"password"}
                                    value={password}
                                    isInvalid={'password' in errors}
                                    onChangeText={setPassword}
                                    isPassword={true}/>
                                {errors.password && <InputErrorLabel error={errors.password}/>}
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
                                            handleSubmit()
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
                        </UserBasicInfoForm>)}
                    </Formik>
                </Box>
            </Center>
        </KeyboardAvoidingView>
    </ScrollView>;
};
