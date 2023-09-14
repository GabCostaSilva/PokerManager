import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // @ts-ignore
  const { dispatch } = useAuthContext();
  const signUp = async (username: string, password: string) => {

    setIsLoading(false);
    setError(false);

    const response = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const jsonData = await response.json();
    if (!jsonData.ok) {
      setIsLoading(false);
      setError(jsonData.error);
    } else if (response.ok) {

      localStorage.setItem("user", JSON.stringify(jsonData));

      dispatch({ type: "LOGIN", payload: jsonData });

      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
};