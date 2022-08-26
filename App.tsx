import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import { View } from "react-native";
import AuthForm from "./src/components/AuthForm/AuthForm";
import useCheckAuthOrLogout from "./src/hooks/domain/auth/useCheckAuthOrLogout";

import useCachedResources from "./src/hooks/useCachedResources";
import useAuthStore from "./src/hooks/zustand/useAuthStore";
import ClothingScreen from "./src/screens/ClothingScreen/ClothingScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { myQueryClient } from "./src/utils/myQueryClient";

export default function App() {
  const isLoadingComplete = useCachedResources();

  const { checkAuthOrLogout, loading } = useCheckAuthOrLogout();
  const authUser = useAuthStore((s) => s.authUser);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    checkAuthOrLogout();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={myQueryClient}>
        <NativeBaseProvider>
          {!authUser ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AuthForm />
            </View>
          ) : (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Clothing" component={ClothingScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </NativeBaseProvider>
      </QueryClientProvider>
    );
  }
}
