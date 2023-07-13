import React from 'react';
import {Box, Center} from "native-base";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {View} from "react-native";

interface SignUpFormProps {
    setLogged: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const SignUpForm = ({setLogged}: SignUpFormProps): JSX.Element => {
    const loginWithFacebook = () => {
        setLogged(true)
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome.Button name="google" backgroundColor="#3b5998" onPress={loginWithFacebook} size={32}>
                    Acesse com o Google
                </FontAwesome.Button>
        </View>
    );
};

export default SignUpForm;
