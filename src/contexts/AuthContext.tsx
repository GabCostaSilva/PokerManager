import * as React from "react";
import {useState} from "react";
import {AuthController, UserRegistrationData} from "../adapters/controllers/auth-controller";
import {auth} from "../../firebaseConfig";
import {userActions} from "../state/actions/userActions";
import {useToast} from "@gluestack-ui/themed";

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
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData: UserRegistrationData) => Promise<void>;
    editProfile: (userData: UserData) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextProps>(null);

export const AuthContextProvider = ({children}): JSX.Element => {
        const [user, setUser] = useState(null);
        const [token, setToken] = useState(null)
        const [error, setError] = useState(null);
        const toast = useToast();
        const [isLoading, setIsLoading] = useState(false);

        const login = async (email: string, password: string) => {
            try {
                await AuthController.login(email, password);
                const currentUser = auth.currentUser;
                const accessToken = await currentUser.getIdToken(true);
                setToken(accessToken);
                const response = await userActions.getProfile();
                const user = response.data;

                setUser({...user, ...currentUser});
            } catch (e) {
                setIsLoading(false)
                _setError(e);
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
                setIsLoading(false)
                _setError(e);
                throw e;
            }
        };

        const editProfile = async (userData: UserData) => {
            try {
                setIsLoading(true)
                await userActions.editUserInfo(userData)
                setIsLoading(false)
            } catch (e) {
                setIsLoading(false)
                _setError(e)
                throw e;
            }
        }

        function _setError(e: Error) {
            console.error(e.message)
            const errorMessage = _getErrorMessage(e);
            setError(errorMessage)
        }

        function _getErrorMessage(e: { message: string; }) {
            const {message} = e;

            if (message.includes("email-already-in-use"))
                return "Email já em uso."

            if (message.includes("user-not-found"))
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

        return (
            <AuthContext.Provider value={{
                isSignedIn: token !== null,
                user,
                token,
                setUser,
                error,
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
