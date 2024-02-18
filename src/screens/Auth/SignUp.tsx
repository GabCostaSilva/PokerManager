import React, {useEffect, useState} from "react";
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
    Heading
} from "@gluestack-ui/themed";
import TextInput from "../../components/TextInput";
import {ErrorAlert} from "../../components/alerts/ErrorAlert";
import {useAuthContext} from "../../hooks/useAuthContext";
import {collection, doc, setDoc} from "firebase/firestore";
import {database} from "../../../firebaseConfig";

import * as ImagePicker from "expo-image-picker";
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {UserBasicInfoForm} from "../../components/UserBasicInfoForm";

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

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [image, setImage] = useState(null);

    const [state, setState] = useState(initialState)

    useEffect(() => {
        const requestMediaLibrary = async () => {
            if (Platform.OS !== "web") {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Desculpe, mas precisamos do acesso à câmera para prosseguir.");
                }
            }
        }
    }, [])

    async function saveImageToUser(userId: string,
                                   userEmail: string,
                                   imageUrl: string) {
        console.log('saving image to user')

        const collectionReference = collection(database, "photos");

        await setDoc(doc(collectionReference), {
            userId: userId,
            userEmail: userEmail,
            imageUrl: imageUrl
        });
    }

    async function handleSignUp() {
        await register({...state, password});

        if (null == error)
            navigation.navigate("Login");
        else {
            return;
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
                                isPassword={true}
                            />
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
                    {error && <ErrorAlert message={error}/>}
                </Box>
            </Center>
        </KeyboardAvoidingView>
    </ScrollView>;
};
