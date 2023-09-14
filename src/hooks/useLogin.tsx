import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogin = () => {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(false);

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const jsonData = await response.json();
    console.log("loginData", jsonData);
    if (!jsonData.ok) {
      setIsLoading(false);
      setError("Erro ao fazer login. Tente novamente mais tarde");
    } else if (response.ok) {

      await AsyncStorage.setItem("user", JSON.stringify(jsonData));

      dispatch({ type: "LOGIN", payload: jsonData });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};