import {KeyboardAvoidingView} from "react-native";
import {
    Button,
    ButtonGroup, ButtonText,
    Center,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    VStack
} from "@gluestack-ui/themed";
import React, {useState} from "react";
import TextInput from "../../components/TextInput";
import {CancelButton} from "../../components/buttons/CancelButton";
import {ConfirmButton} from "../../components/buttons/ConfirmButton";
import {useAuthContext} from "../../hooks/useAuthContext";

export const ChangePassword = ({navigation}) => {
    const {isLoading} = useAuthContext();

    const [currentPassword, setCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)

    function changePassword() {


    }

    return <KeyboardAvoidingView>
        <Center>
            <VStack space={"md"} w="90%">
                <FormControl >
                    <FormControlLabel>
                        <FormControlLabelText>
                            Senha atual
                        </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput isPassword={true} onChangeText={setCurrentPassword} value={currentPassword}/>
                </FormControl>
                <FormControl>
                    <FormControlLabel>
                        <FormControlLabelText>
                            Nova senha
                        </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput isPassword={true} onChangeText={setNewPassword} value={newPassword}/>
                </FormControl>

                <ButtonGroup flexDirection={"row"} justifyContent={"center"}>
                    <CancelButton onPress={() => {
                        navigation.goBack();
                    }}/>
                    <ConfirmButton isLoading={isLoading} onPress={changePassword}/>
                </ButtonGroup>
            </VStack>
        </Center>
    </KeyboardAvoidingView>
}