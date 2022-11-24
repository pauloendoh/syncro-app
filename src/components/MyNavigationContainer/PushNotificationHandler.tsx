import { addNotificationResponseReceivedListener } from "expo-notifications"
import React, { useEffect } from "react"
import { useHandleOpenPushNotification } from "../../hooks/useHandleOpenPushNotification"

interface Props {
  test?: string
}

const PushNotificationHandler = (props: Props) => {
  const handleOpenPushNotification = useHandleOpenPushNotification()

  useEffect(() => {
    addNotificationResponseReceivedListener(handleOpenPushNotification)
  }, [])

  return <></>
}

export default PushNotificationHandler
