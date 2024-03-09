import * as React from "react";
import {useEffect, useState} from "react";
import {AuthController, UserRegistrationData} from "../adapters/controllers/auth-controller";
import {auth} from "../../firebaseConfig";
import {userActions} from "../state/actions/userActions";
import {useToast} from "@gluestack-ui/themed";
import {useShowToast} from "../hooks/useShowToast";

export type UserData = {
    name: string,
    username: string,
    uid: string,
    phoneNumber: string,
    metadata: any,
    email: string,
    docNumber: string,
    pix: string,
    bank: string,
    bankAgency: string,
    bankAccountNumber: string,
    picPay: string,
    photoURL?: string,
}

interface AuthContextProps {
    isSignedIn: boolean;
    user: UserData;
    token: string;
    setUser: (value: unknown) => void;
    error: string;
    setError: (value: unknown) => void;
    getErrorMessage: () => string;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData: UserRegistrationData) => Promise<void>;
    editProfile: (userData: UserData) => Promise<void>;
    getProfile: () => Promise<UserData>,
}

export const AuthContext = React.createContext<AuthContextProps>(null);

export const AuthContextProvider = ({children}): JSX.Element => {
        const [user, setUser] = useState(null);
        const [token, setToken] = useState(null)
        const [error, setError] = useState(null);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            console.log("hello Mr Error", error)
        }, [error]);

        const login = async (email: string, password: string) => {
            setError(null)
            try {
                const userCredentials = await AuthController.login(email, password);
                setToken(await userCredentials.user?.getIdToken(true));
                const axiosResponse = await userActions.getProfile();
                const {data: userProfile} = axiosResponse;
                const {uid, email: userEmail, displayName, photoURL} = auth.currentUser;
                setUser({...userProfile, uid, email: userEmail, displayName, photoURL});
            } catch (e) {
                _setError(e);
                setToken(null)
                setIsLoading(false)
                throw e;
            }
        };

        const logout = async () => {
            await AuthController.logout();
            setUser(null);
            setToken(null);
        };

        const register = async (userData: UserRegistrationData) => {
            try {
                setIsLoading(true)
                let response = await AuthController.register(userData);
                if (null == response) {
                    _setError(new Error("Sistema fora do ar"));
                }
                setIsLoading(false)
                return;
            } catch (e) {
                _setError(e);
                setIsLoading(false)
                throw e;
            }
        };

        const editProfile = async (userData: UserData) => {
            try {
                setIsLoading(true)
                await userActions.editUserInfo(userData)
                setIsLoading(false)
            } catch (e) {
                _setError(e)
                setIsLoading(false)
                throw e;
            }
        }

        function _setError(e: Error) {
            const errorMessage = _getErrorMessage(e);
            setError(errorMessage)
        }

        function _getErrorMessage(e: { message: string; }) {
            const {message} = e;
            console.log("getErrorMessage", message)
            if (message.includes("session-not-found") || message.includes("session-cookie-expired"))
                return "Faça login novamente para continuar.";

            else if (message.includes("email-already-in-use"))
                return "Email já em uso."

            else if (message.includes("user-not-found"))
                return "Usuário não encontrado."

            else if (message.includes("weak-password"))
                return "A senha deve conter ao menos 6 caracteres.";

            else if (message.includes("wrong-password"))
                return "Senha incorreta. Tente novamente com outra senha.";

            else if (message.includes("missing-password"))
                return "Digite sua senha para entrar.";

            else if (message.includes("invalid-email"))
                return "Email inválido. Tente novamente com outro email.";

            else
                return "Erro ao processar operação. Tente novamente daqui alguns momentos.";
        }

        async function getProfile() {
            setIsLoading(true)
            setError(null)
            try {
                const axiosResponse = await userActions.getProfile();
                setIsLoading(false)
                const user: UserData = axiosResponse.data;
                return user
            } catch (e) {
                setIsLoading(false)
                setError(e.message)
            }
        }

        function getErrorMessage() {
            return error;
        }

        return (
            <AuthContext.Provider value={{
                isSignedIn: token !== null,
                user,
                getProfile,
                token,
                setUser,
                error,
                getErrorMessage,
                setError: _setError,
                isLoading,
                login,
                logout,
                register,
                editProfile
            } as AuthContextProps}>
                {children}
            </AuthContext.Provider>
        );
    }
;
