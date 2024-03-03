import {Box, ButtonGroup, Center, Heading, Spinner, useToast} from "@gluestack-ui/themed";
import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import {UserBasicInfoForm} from "../../components/UserBasicInfoForm";
import {useAuthContext} from "../../hooks/useAuthContext";
import {ErrorAlert} from "../../components/alerts/ErrorAlert";
import {CancelButton} from "../../components/buttons/CancelButton";
import {ConfirmButton} from "../../components/buttons/ConfirmButton";
import {onlyNumbers} from "../../utils/utils";

export const EditProfile = ({navigation}) => {
    const {getProfile, isLoading, error, editProfile, user} = useAuthContext();
    const [userProfile, setUserProfile] = useState({phoneNumber: user.phoneNumber.split("+55")[1], ...user})
    const [state, setState] = useState({
        docNumber: onlyNumbers(user.docNumber),
        ...userProfile
    })

    useEffect(() => {
        // console.log("this is user", user)
        return navigation.addListener('focus', () => {
            (async () => {
                console.log("inside focus")
                const userData = await getProfile();
                console.log("this is user data", userData)
                setUserProfile(userData)
            })()
        });
    }, [navigation]);

    const toast = useToast();

    const handleEditUser = async () => {
        try {
            const {phoneNumber, ...partial} = state
            const phoneIso = "+55" + onlyNumbers(phoneNumber);

            await editProfile({
                phoneNumber: phoneIso,
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
                {isLoading ? <Spinner/> : <Box px="$2" w="90%" py="$4" justifyContent="center">
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
                </Box>}
            </Center>
        </ScrollView>
    </KeyboardAvoidingView>
}