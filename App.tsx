import { StatusBar } from "expo-status-bar"
// https://github.com/formatjs/formatjs/issues/1591#issuecomment-592328534
import "intl"
import "intl/locale-data/jsonp/en"
import {
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native"

import { QueryClientProvider } from "@tanstack/react-query"
import { Alert, NativeBaseProvider } from "native-base"
import React, { useEffect, useMemo } from "react"
import useCheckAuthOrLogout from "./src/hooks/domain/auth/useCheckAuthOrLogout"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFonts } from "expo-font"
import * as Notifications from "expo-notifications"
import * as Updates from "expo-updates"
import { SafeAreaProvider } from "react-native-safe-area-context"
import * as Sentry from "sentry-expo"
import MyNavigationContainer from "./src/components/MyNavigationContainer/MyNavigationContainer"
import useCachedResources from "./src/hooks/useCachedResources"
import useAuthStore from "./src/hooks/zustand/useAuthStore"
import AuthScreen from "./src/screens/AuthScreen/AuthScreen"
import LoadingScreen from "./src/screens/LoadingScreen/LoadingScreen"
import { myTheme } from "./src/utils/myTheme"
import { storageKeys } from "./src/utils/storageKeys"
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function App() {
  const isLoadingComplete = useCachedResources()

  const { checkAuthOrLogout, loading: loadingUser } = useCheckAuthOrLogout()
  const authUser = useAuthStore((s) => s.authUser)

  const myQueryClient = useMyQueryClient()

  const registerForPushNotifications = async () => {
    const { granted } = await Notifications.requestPermissionsAsync()
    if (!granted) {
      alert("Fail to get the push token")
      return
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: "@pauloendoh/syncro",
      })
    ).data
    return token
  }

  useEffect(() => {
    checkAuthOrLogout()
    reactToUpdates()

    registerForPushNotifications().then((token) => {
      if (token) AsyncStorage.setItem(storageKeys.pushToken, token)

      console.log(token)
    })
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
        <SafeAreaProvider>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: myTheme.colors.light[900],
              }}
            >
              <StatusBar style="light" />

              {!completedLoading && <LoadingScreen />}
              {completedLoading && (
                <>{!authUser ? <AuthScreen /> : <MyNavigationContainer />}</>
              )}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  )
}
