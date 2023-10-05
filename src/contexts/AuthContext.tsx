import * as React from "react";
import {useState} from "react";
import {AuthController} from "../adapters/controllers/auth-controller";
import {localStorageAdapter} from "../adapters/localStorageAdapter";
import jwtDecode from "jwt-decode";

export const AuthContext = React.createContext({});

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({access_token: null});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            const response = await AuthController.login(email, password);
            await localStorageAdapter.setAccessToken(response.data.access_token);
            // @ts-ignore
            setUser(response.data.profile);
        } catch (e) {
            setError(e.message);
        }
    };

    const logout = async () => {
        await AuthController.logout();
        setUser(null);
        await localStorageAdapter.removeAccessToken();
    };

    // const resetPassword = async (email: string, password: string) => {
    //   await AuthController.resetPassword(email, password);
    // };

    type UserData = {
        name: string,
        userName: string,
        phoneNumber: string,
        email: string,
        docNumber: string,
        password: string
    }
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
            isSignedIn: user?.access_token !== null,
            user: user,
            error,
            setError,
            isLoading,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
};