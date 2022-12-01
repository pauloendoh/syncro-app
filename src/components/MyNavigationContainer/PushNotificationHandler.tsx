import {
  addNotificationResponseReceivedListener,
  useLastNotificationResponse,
} from "expo-notifications"
import React, { useEffect } from "react"
import { useHandleOpenPushNotification } from "../../hooks/useHandleOpenPushNotification"
import useNavigationStore from "../../hooks/zustand/useNavigationStore"

interface Props {
  test?: string
}

const PushNotificationHandler = (props: Props) => {
  const handleOpenPushNotification = useHandleOpenPushNotification()

  const lastNotificationResponse = useLastNotificationResponse()

  const isReady = useNavigationStore((s) => s.isReady)
  useEffect(() => {
    if (!isReady) return

    addNotificationResponseReceivedListener(handleOpenPushNotification)

    if (lastNotificationResponse)
      handleOpenPushNotification(lastNotificationResponse)
  }, [isReady])

  return <></>
}

export default PushNotificationHandler
