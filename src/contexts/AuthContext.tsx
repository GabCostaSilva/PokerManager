import * as React from "react";
import {useState} from "react";
import {AuthController} from "../adapters/controllers/auth-controller";
import {localStorageAdapter} from "../adapters/localStorageAdapter";

type UserData = {
    name: string,
    userName: string,
    phoneNumber: string,
    email: string,
    docNumber: string,
    password: string
}

interface AuthContextProps {
    isSignedIn: boolean;
    user: unknown;
    token: string;
    setUser: (value: unknown) => void;
    error: string;
    setError: (value: unknown) => void;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData: UserData) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextProps>(null);

export const AuthContextProvider = ({children}): JSX.Element => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            const response = await AuthController.login(email, password);
            await localStorageAdapter.setAccessToken(response?.data?.access_token);
            setToken(response?.data?.access_token);
            // @ts-ignore
            setUser(response?.data?.profile);
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

    // const resetPassword = async (email: string, password: string) => {
    //   await AuthController.resetPassword(email, password);
    // };

    const register = async (userData: UserData) => {
        try {
            let response = await AuthController.register(userData);
            if (null == response) {
                setError("Sistema fora do ar");
                return;
            } else if (response.statusCode >= 400) {
                setError(response.message);
            }
        } catch (e) {
            console.error(e.message);
            setError(e.message);
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