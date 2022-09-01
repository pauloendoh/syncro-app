import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";
import React, { useEffect, useMemo } from "react";
import { View } from "react-native";
import useCheckAuthOrLogout from "./src/hooks/domain/auth/useCheckAuthOrLogout";

import useCachedResources from "./src/hooks/useCachedResources";
import useAuthStore from "./src/hooks/zustand/useAuthStore";
import AuthScreen from "./src/screens/AuthScreen/AuthScreen";
import TagModal from "./src/screens/ClothingScreen/AddTagButton/TagModal/TagModal";
import ClothingScreen from "./src/screens/ClothingScreen/ClothingScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import HomeTitle from "./src/screens/HomeScreen/HomeTitle/HomeTitle";
import LoadingScreen from "./src/screens/LoadingScreen/LoadingScreen";
import { StackParamType } from "./src/types/StackParamType";
import { myQueryClient } from "./src/utils/myQueryClient";
import { myTheme } from "./src/utils/myTheme";

const RootStack = createNativeStackNavigator<StackParamType>();

export default function App() {
  const isLoadingComplete = useCachedResources();

  const { checkAuthOrLogout, loading: loadingUser } = useCheckAuthOrLogout();
  const authUser = useAuthStore((s) => s.authUser);

  useEffect(() => {
    checkAuthOrLogout();
  }, []);

  const completedLoading = useMemo(() => isLoadingComplete && !loadingUser, [
    isLoadingComplete,
    loadingUser,
  ]);

  return (
    <QueryClientProvider client={myQueryClient}>
      <NativeBaseProvider theme={myTheme}>
        <View
          style={{
            flex: 1,
          }}
        >
          <StatusBar style="light" translucent />

          {!completedLoading && <LoadingScreen />}
          {completedLoading && (
            <>
              <TagModal />

              {!authUser ? (
                <AuthScreen />
              ) : (
                <NavigationContainer>
                  <RootStack.Navigator initialRouteName="Home">
                    <RootStack.Screen
                      name="Home"
                      component={HomeScreen}
                      options={{
                        headerStyle: {
                          backgroundColor: "#1E1E1E",
                        },

                        headerTitle: (props) => <HomeTitle />,
                      }}
                    />
                    <RootStack.Screen
                      name="Clothing"
                      component={ClothingScreen}
                    />
                  </RootStack.Navigator>
                </NavigationContainer>
              )}
            </>
          )}
        </View>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
