import { NavigationProp, useNavigation } from "@react-navigation/native"
import { NotificationResponse } from "expo-notifications"
import { HomeScreenTypes } from "../types/HomeScreenTypes"
import { pushNotificationTitles } from "../utils/pushNotificationTitles"

export const useHandleOpenPushNotification = () => {
  const { navigate } = useNavigation<NavigationProp<HomeScreenTypes>>()
  const handleOpenPushNotification = (response: NotificationResponse) => {
    const title = response.notification.request.content.title
    if (
      title === "New follower!" ||
      title === pushNotificationTitles.userItemRecommendation
    ) {
      navigate("Notifications")
    }
  }

  return handleOpenPushNotification
}
