import LoginScreen from "@components/loginScreen";
import { UserContext } from "@lib/contexts/userContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";

function Login() {
  const router = useRouter();
  const { admin } = useContext(UserContext);

  if (admin) return <p></p>;

  return <LoginScreen />;
}

export default Login;
