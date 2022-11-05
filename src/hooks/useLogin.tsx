import { useState } from "react";
import { setCookie } from "cookies-next";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status < 200 || response.status >= 500) {
        setLoading(false);
        return false;
      }
      const responseData = await response.json();
      // console.log(responseData); //debug

      if (responseData.error !== undefined) {
        setLoading(false);
        setError(responseData.error);
        return false;
      }

      if (responseData.password !== undefined) {
        setCookie("token", responseData.password);
        setLoading(false);
        return true;
      }

      return false;
    } catch (e) {
      setLoading(false);
      return false;
    }
  }

  return {
    loading,
    error,
    login,
  };
}