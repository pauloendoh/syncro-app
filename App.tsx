import { StatusBar } from "expo-status-bar"

import { QueryClientProvider } from "@tanstack/react-query"
import { NativeBaseProvider } from "native-base"
import React, { useEffect, useMemo } from "react"
import { View } from "react-native"
import useCheckAuthOrLogout from "./src/hooks/domain/auth/useCheckAuthOrLogout"

import MyNavigationContainer from "./src/components/MyNavigationContainer/MyNavigationContainer"
import useCachedResources from "./src/hooks/useCachedResources"
import useAuthStore from "./src/hooks/zustand/useAuthStore"
import AuthScreen from "./src/screens/AuthScreen/AuthScreen"
import LoadingScreen from "./src/screens/LoadingScreen/LoadingScreen"
import { myQueryClient } from "./src/utils/myQueryClient"
import { myTheme } from "./src/utils/myTheme"

export default function App() {
  const isLoadingComplete = useCachedResources()

  const { checkAuthOrLogout, loading: loadingUser } = useCheckAuthOrLogout()
  const authUser = useAuthStore((s) => s.authUser)

  useEffect(() => {
    checkAuthOrLogout()
  }, [])

  const completedLoading = useMemo(() => isLoadingComplete && !loadingUser, [
    isLoadingComplete,
    loadingUser,
  ])

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
            <>{!authUser ? <AuthScreen /> : <MyNavigationContainer />}</>
          )}
        </View>
      </NativeBaseProvider>
    </QueryClientProvider>
  )
}
