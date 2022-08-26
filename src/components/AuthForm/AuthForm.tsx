import { Box } from "native-base";
import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./SignUpForm/SignUpForm";

interface Props {
  test?: string;
}

const AuthForm = (props: Props) => {
  type FormType = "register" | "login";

  const [currentForm, setCurrentForm] = useState<FormType>("register");

  return (
    <Box padding={2} bgColor="gray.400" width="300px" borderRadius={4}>
      {currentForm === "register" && (
        <SignUpForm onToggleForm={() => setCurrentForm("login")} />
      )}
      {currentForm === "login" && <LoginForm />}
    </Box>
  );
};

export default AuthForm;
