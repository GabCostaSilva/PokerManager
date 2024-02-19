import {Box, ButtonGroup, Center, Heading, useToast} from "@gluestack-ui/themed";
import React, {useState} from "react";
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {UserBasicInfoForm} from "../../components/UserBasicInfoForm";
import {useAuthContext} from "../../hooks/useAuthContext";
import {ErrorAlert} from "../../components/alerts/ErrorAlert";
import {CancelButton} from "../../components/buttons/CancelButton";
import {ConfirmButton} from "../../components/buttons/ConfirmButton";
import {onlyNumbers} from "../../utils/utils";

export const EditProfile = ({navigation}) => {
    const {user, isLoading, error, editProfile} = useAuthContext();

    const toast = useToast();
    const [state, setState] = useState({
        name: user.name,
        username: user.username,
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        metadata: user.metadata,
        email: user.email,
        docNumber: user.docNumber,
        pix: user.pix,
        bank: user.bank,
        bankAgency: user.bankAgency,
        bankAccountNumber: user.bankAccountNumber,
        picPay: user.picPay,
        photoURL: user.photoURL
    })

    const handleEditUser = async () => {
        try {
            const {phoneNumber, ...partial} = state
            const number = "+55" + onlyNumbers(phoneNumber);
            console.log(partial)
            await editProfile({
                phoneNumber: number,
                ...partial
            })
            navigation.goBack();
        } catch (e) {
            toast.show({
                placement: "top",
                render: ({id}) => {
                    const toastId = "toast-" + id;
                    return <ErrorAlert message={error} id={toastId}/>
                }
            })
        }
    };

    return <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
            <Center>
                <Box px="$2" w="90%" py="$4" justifyContent="center">
                    <Heading size="lg" fontWeight="600">
                        Área do Usuário
                    </Heading>
                    <Heading fontWeight="400" size="xs" mb={"$4"}>
                        Editar dados de perfil
                    </Heading>
                    <UserBasicInfoForm state={state} setState={setState} emailDisabled={true}>
                        <ButtonGroup flexDirection={"row"} justifyContent={"space-around"}>
                            <CancelButton onPress={() => {
                                navigation.goBack();
                            }}/>
                            <ConfirmButton onPress={handleEditUser} isLoading={isLoading}/>
                        </ButtonGroup>
                    </UserBasicInfoForm>
                </Box>
            </Center>
        </ScrollView>
    </KeyboardAvoidingView>
}