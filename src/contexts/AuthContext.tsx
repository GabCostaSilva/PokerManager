import * as React from "react";
import {useState} from "react";
import {AuthController, UserRegistrationData} from "../adapters/controllers/auth-controller";
import {localStorageAdapter} from "../adapters/localStorageAdapter";
import {connectAuthEmulator} from "firebase/auth";
import {auth} from "../../firebaseConfig";

type UserData = {
    name: string,
    username: string,
    phoneNumber: string,
    email: string,
    docNumber: string,
    pix: string,
    bank: string,
    bankAgency: string,
    bankAccountNumber: string,
    picPay: string,
}

type UserCreationData = {
    userData: UserData,
    password: string
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
            const accessToken = await auth.currentUser.getIdToken(true);
            setToken(accessToken);
            setUser(auth.currentUser);
        } catch (e) {
            setError(e.message);
        }
    };

    const logout = async () => {
        await AuthController.logout();
        setUser(null);
        setToken(null);
        await localStorageAdapter.removeAccessToken();
    };

    const resetPassword = async (email: string, password: string) => {
        await AuthController.resetPassword(email, password);
    };


    const register = async (userData: UserRegistrationData) => {
        try {
            setIsLoading(true)
            let response = await AuthController.register(userData);
            if (null == response) {
                console.log("response null")
                setError("Sistema fora do ar");
            }
            setIsLoading(false)
            return;
        } catch (e) {
            setIsLoading(false)
            console.error(e.message);
            let message = null;
            if (e.message.includes("email-already-in-use")) {
                message = "Email já em uso."
            } else if (e.message.include("weak-password")) {
                message = "A senha deve conter ao menos 6 caracteres."
            } else {
                message = "Erro ao realizar cadastro. Tente novamente daqui alguns momentos."
            }
            setError(message);
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
};
