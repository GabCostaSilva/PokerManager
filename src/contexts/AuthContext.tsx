import * as React from "react";
import {useState} from "react";
import {AuthController, UserRegistrationData} from "../adapters/controllers/auth-controller";
import {auth} from "../../firebaseConfig";

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
}

export const AuthContext = React.createContext<AuthContextProps>(null);

export const AuthContextProvider = ({children}): JSX.Element => {
        const [user, setUser] = useState(null);
        const [token, setToken] = useState(null)
        const [error, setError] = useState(null);
        const [isLoading, setIsLoading] = useState(false);

        const login = async (email: string, password: string) => {
            try {
                await AuthController.login(email, password);
                const currentUser = auth.currentUser;
                const accessToken = await currentUser.getIdToken(true);
                setToken(accessToken);
                const response = await AuthController.getUser();
                const user = response.data;

                setUser({...user, ...currentUser});
            } catch (e) {
                console.error(e)
                setError(_getErrorMessage(e));
            }
        };

        function _getErrorMessage(e: { message: string; }) {
            const {message} = e;
            console.error(message)

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
                    setError("Sistema fora do ar");
                }
                setIsLoading(false)
                return;
            } catch (e) {
                setIsLoading(false)
                console.error(e.message);
                setError(_getErrorMessage(e));
            }
        };

        return (
            <AuthContext.Provider value={{
                isSignedIn: token !== null,
                user,
                token,
                setUser,
                error,
                setError,
                isLoading,
                login,
                logout,
                register
            } as AuthContextProps}>
                {children}
            </AuthContext.Provider>
        );
    }
;
