// https://github.com/formatjs/formatjs/issues/1591#issuecomment-592328534
import "intl"
import "intl/locale-data/jsonp/en"
import { Platform } from "react-native"

import { StatusBar } from "expo-status-bar"

import { QueryClientProvider } from "@tanstack/react-query"
import { NativeBaseProvider } from "native-base"
import React, { useEffect, useMemo } from "react"
import { View } from "react-native"
import useCheckAuthOrLogout from "./src/hooks/domain/auth/useCheckAuthOrLogout"

import * as Updates from "expo-updates"
import * as Sentry from "sentry-expo"
import MyNavigationContainer from "./src/components/MyNavigationContainer/MyNavigationContainer"
import useCachedResources from "./src/hooks/useCachedResources"
import useAuthStore from "./src/hooks/zustand/useAuthStore"
import AuthScreen from "./src/screens/AuthScreen/AuthScreen"
import LoadingScreen from "./src/screens/LoadingScreen/LoadingScreen"
import { myTheme } from "./src/utils/myTheme"
import { useMyQueryClient } from "./src/utils/useMyQueryClient"

Sentry.init({
  dsn:
    "https://15403644e94d4a4b9a551185730957dd@o1384500.ingest.sentry.io/6702942",
  enableInExpoDevelopment: false,
  debug: true,
})

if (Platform.OS === "android") {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof (Intl as any).__disableRegExpRestore === "function") {
    ;(Intl as any).__disableRegExpRestore()
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources()

  const { checkAuthOrLogout, loading: loadingUser } = useCheckAuthOrLogout()
  const authUser = useAuthStore((s) => s.authUser)

  const myQueryClient = useMyQueryClient()

  useEffect(() => {
    checkAuthOrLogout()
    reactToUpdates()
  }, [])

  const completedLoading = useMemo(() => isLoadingComplete && !loadingUser, [
    isLoadingComplete,
    loadingUser,
  ])

  const reactToUpdates = async () => {
    const { isAvailable } = await Updates.checkForUpdateAsync()
    if (isAvailable) {
      await Updates.fetchUpdateAsync()
      await Updates.reloadAsync()
    }
  }

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
