import LoginScreen from "@components/loginScreen";
import { UserContext } from "@lib/contexts/userContext";
import React, { useContext } from "react";

function Login() {
  const { admin } = useContext(UserContext);

  if (admin) return null;

  return <LoginScreen />;
}

export default Login;
