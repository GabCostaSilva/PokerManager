import * as React from "react";
import { useState } from "react";
import { AuthController } from "../adapters/controllers/auth-controller";
import { localStorageAdapter } from "../adapters/localStorageAdapter";

export const AuthContext = React.createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({ access_token: null });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = async (username: string, password: string) => {
    try {
      const { access_token } = await AuthController.login(username, password);
      console.log("loginResponse", access_token);
      await localStorageAdapter.setAccessToken(access_token);
      setUser({ access_token });
    } catch (e) {
      console.error(e.message);
      setError(e.message);
    }
  };

  const logout = async () => {
    await AuthController.logout();
    setUser({ access_token: null });
    await localStorageAdapter.setAccessToken(null);
  };

  // const resetPassword = async (email: string, password: string) => {
  //   await AuthController.resetPassword(email, password);
  // };

  const register = async (name: string,
                          userName: string,
                          email: string,
                          docNumber: string,
                          password: string) => {
    return await AuthController.register({ name, userName, email, docNumber, password });
  };

  return (
    <AuthContext.Provider value={{
      isSignedIn: !!user.access_token,
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