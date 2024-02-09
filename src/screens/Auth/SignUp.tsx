import React, {useEffect, useState} from "react";
import {Box, Center, VStack} from "native-base";
import {
    Button,
    ButtonText,
    FormControl,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText,
    Heading
} from "@gluestack-ui/themed";
import TextInput from "../../components/TextInput";
import {LoadingButton} from "../../components/LoadingButton";
import {ErrorAlert} from "../../components/alerts/ErrorAlert";
import {CpfInput} from "../../components/inputs/CpfInput";
import {PhoneInput} from "../../components/inputs/PhoneInput";
import {useAuthContext} from "../../hooks/useAuthContext";
import {collection, doc, setDoc} from "firebase/firestore";
import {database} from "../../../firebaseConfig";

import * as ImagePicker from "expo-image-picker";
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";

export const SignUp = ({navigation}) => {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [image, setImage] = useState(null);
    const [state, setState] = useState({
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
    })

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

    // @ts-ignore
    const {register, error, isLoading, user} = useAuthContext();

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
                                value={state.email}
                                onChangeText={(email: string) => setState(prevState => (
                                    {...prevState, email}))
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Telefone para contato
                                </FormControlLabelText>
                            </FormControlLabel>
                            <PhoneInput
                                value={state.phoneNumber}
                                onChangeText={(phoneNumber: string) => setState(prevState => (
                                    {...prevState, phoneNumber}))
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Nome completo
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput
                                value={state.name}
                                onChangeText={(name: string) => setState(prevState => (
                                    {...prevState, name}))
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Nome de usuário
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput
                                value={state.userName}
                                onChangeText={(username: string) => setState(prevState => (
                                    {...prevState, userName: username}
                                ))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    CPF
                                </FormControlLabelText>
                            </FormControlLabel>
                            <CpfInput
                                value={state.docNumber}
                                onChangeText={(docNumber: string) => setState(prevState => (
                                    {...prevState, docNumber}
                                ))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Pix
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput
                                value={state.pix}
                                onChangeText={(pix: string) => setState(prevState => (
                                    {...prevState, pix}
                                ))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Banco
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput
                                value={state.bank}
                                onChangeText={(bank: string) => setState(prevState => (
                                    {...prevState, bank}
                                ))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Agência
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput
                                value={state.bankAgency}
                                onChangeText={(bankAgency: string) => setState(prevState => (
                                    {...prevState, bankAgency}
                                ))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Conta
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput
                                value={state.bankAccountNumber}
                                onChangeText={(bankAccountNumber: string) => setState(prevState => (
                                    {...prevState, bankAccountNumber}
                                ))}
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
                            <FormControlHelper>
                                <FormControlHelperText>
                                    Deve conter ao menos 6 caracteres.
                                </FormControlHelperText>
                            </FormControlHelper>
                        </FormControl>
                        <FormControl>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    Confirme sua senha
                                </FormControlLabelText>
                            </FormControlLabel>
                            <TextInput isPassword={true} value={passwordConfirmation}
                                       onChangeText={setPasswordConfirmation}/>
                        </FormControl>
                        {isLoading ? <LoadingButton/> :
                            <Button minWidth={20} marginTop="$4" onPress={handleSignUp} disabled={isLoading}>
                                <ButtonText>Cadastrar</ButtonText>
                            </Button>}
                        <Button minWidth={20} marginTop="$4"
                                onPress={() => {
                                    navigation.navigate("Login");
                                }}>
                            <ButtonText>Entrar</ButtonText>
                        </Button>
                    </VStack>
                    {error && <ErrorAlert message={error}/>}
                </Box>
            </Center>
        </KeyboardAvoidingView>
    </ScrollView>;
};
