import { VStack } from "native-base";
import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthScreen = () => {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      flex="1"
      backgroundColor="#1E1E1E"
    >
      <AuthForm />
    </VStack>
  );
};

export default AuthScreen;
