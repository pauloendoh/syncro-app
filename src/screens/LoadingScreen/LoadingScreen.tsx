import { Spinner, VStack } from "native-base";
import React from "react";

interface Props {
  test?: string;
}

const LoadingScreen = (props: Props) => {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      backgroundColor="#1E1E1E"
      flex="1"
      space="8"
    >
      <Spinner size="lg" />
    </VStack>
  );
};

export default LoadingScreen;
