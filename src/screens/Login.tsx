import React from 'react';
import {Box, Center} from "native-base";
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface SignUpFormProps {
    setLogged: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const SignUpForm = ({setLogged}: SignUpFormProps): JSX.Element => {
    const loginWithFacebook = () => {
        setLogged(true)
    };

    return (
        <Box safeAreaTop>
            <Center>
                <FontAwesome.Button name="google" backgroundColor="#3b5998" onPress={loginWithFacebook}>
                    Acesse com o Google
                </FontAwesome.Button>
            </Center>
        </Box>
    );
};

export default SignUpForm;
