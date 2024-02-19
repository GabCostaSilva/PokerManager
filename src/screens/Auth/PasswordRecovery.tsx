import {ActivityIndicator, KeyboardAvoidingView, StyleSheet, TextInput, View} from "react-native";
import {useState} from "react";
import {AuthController} from "../../adapters/controllers/auth-controller";
import {ButtonGroup, Button, Text, ButtonText} from "@gluestack-ui/themed";
import {Center, HStack} from "native-base";

export default function PasswordRecovery({navigation}) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")

    const sendEmail = async () => {
        setIsLoading(true)

        try {
            await AuthController.sendPasswordRecoveryEmail(email)
            alert(`Email enviado para ${email}`)
            navigation.goBack();
        } catch (error) {
            console.error(error)
            alert("Usuário não encontrado.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={"position"}>
                <Text style={styles.title}>Recuperar senha</Text>
                <TextInput onChangeText={setEmail} style={styles.input} autoCapitalize={"none"} placeholder="Email"/>
                <Center>
                    {
                        isLoading
                            ? <ActivityIndicator size={"large"} color={"#000fff"}/>
                            : <ButtonGroup justifyContent={"space-between"}>
                                <Button style={{flex: 1}} variant="outline" action={"secondary"} onPress={() => navigation.goBack()}>
                                    <ButtonText>Voltar</ButtonText>
                                </Button>
                                <Button style={{flex: 1}} onPress={() => sendEmail()}>
                                    <ButtonText>Enviar</ButtonText>
                                </Button>
                            </ButtonGroup>
                    }
                </Center>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    }
});
