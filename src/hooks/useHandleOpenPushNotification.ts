import { NavigationProp, useNavigation } from "@react-navigation/native"
import { NotificationResponse } from "expo-notifications"
import { HomeScreenTypes } from "../types/HomeScreenTypes"

export const useHandleOpenPushNotification = () => {
  const { navigate } = useNavigation<NavigationProp<HomeScreenTypes>>()
  const handleOpenPushNotification = (response: NotificationResponse) => {
    const title = response.notification.request.content.title
    if (title === "New follower!") {
      navigate("Notifications")
    }
    console.log(response)
  }

  return handleOpenPushNotification
}
