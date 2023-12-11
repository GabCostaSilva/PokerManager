import React, {useState} from "react";
import {Box, Button, Center, VStack} from "native-base";
import {FormControl, FormControlLabel, FormControlLabelText, Heading} from "@gluestack-ui/themed";
import TextInput from "../../components/TextInput";
import {LoadingButton} from "../../components/LoadingButton";
import {ErrorAlert} from "../../components/alerts/ErrorAlert";
import {CpfInput} from "../../components/inputs/CpfInput";
import {PhoneInput} from "../../components/inputs/PhoneInput";

export const SignUp = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [state, setState] = useState({
        name: "",
        username: "",
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

        if (null == error)
            navigation.navigate("Login");
    }

    function getOnChangeText(userProp: string) {
        return (userValue: string) => setState(prevState => (
            {...prevState, [userProp]: userValue}
        ));
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
                        value={state.username}
                        onChangeText={(username: string) => setState(prevState => (
                            {...prevState, username}
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
                </FormControl>
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>
                            Confirme sua senha
                        </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput isPassword={true} value={passwordConfirmation} onChangeText={setPasswordConfirmation}/>
                </FormControl>
                {isLoading ? <LoadingButton/> :
                    <Button colorScheme="primary" minW={20} mt="4" onPress={handleSignUp} disabled={isLoading}>
                        Cadastrar
                    </Button>}
                <Button colorScheme="primary" minW={20} mt="4"
                        onPress={() => {
                            navigation.navigate("Login");
                        }}>
                    Voltar
                </Button>
            </VStack>
            {error && <ErrorAlert message={error}/>}
        </Box>
    </Center>;
};
