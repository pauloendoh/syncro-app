// https://github.com/formatjs/formatjs/issues/1591#issuecomment-592328534
import "intl"
import "intl/locale-data/jsonp/en"
import { Platform } from "react-native"

import { StatusBar } from "expo-status-bar"

import { QueryClientProvider } from "@tanstack/react-query"
import { Alert, NativeBaseProvider } from "native-base"
import React, { useEffect, useMemo } from "react"
import { View } from "react-native"
import useCheckAuthOrLogout from "./src/hooks/domain/auth/useCheckAuthOrLogout"

import { useFonts } from "expo-font"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
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

  const registerForPushNotifications = async () => {
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    if (status !== Permissions.PermissionStatus.GRANTED) {
      const perm = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      status = perm.status
    }
    if (status !== Permissions.PermissionStatus.GRANTED) {
      alert("Fail to get the push token")
      return
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data
    return token
  }

  useEffect(() => {
    checkAuthOrLogout()
    reactToUpdates()

    registerForPushNotifications()
      .then((token) => console.log(token))
      .catch((err) => console.log(err))
  }, [])

  const completedLoading = useMemo(() => isLoadingComplete && !loadingUser, [
    isLoadingComplete,
    loadingUser,
  ])

  const reactToUpdates = async () => {
    Updates.addListener(async (e) => {
      if (e.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
        Alert("There's a new updated. Restart your app to apply.")
      }
    })
  }

  const [fontsLoaded] = useFonts({
    NotoSans: require("./assets/fonts/NotoSans-Regular.ttf"),
  })

  if (!fontsLoaded) return null

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
