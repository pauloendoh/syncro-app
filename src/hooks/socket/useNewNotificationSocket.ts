import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import pushOrReplace from "../../utils/array/pushOrReplace"
import { socketEvents } from "../../utils/socket/socketEvents"
import { urls } from "../../utils/urls"
import { NotificationDto } from "../react-query/notification/types/NotificationDto"
import { useMySocketEvent } from "../useMySocketEvent"

export const useNewNotificationSocket = () => {
  const { lastMessage: lastNotification } = useMySocketEvent<NotificationDto>(
    socketEvents.newNotification
  )

  const qc = useQueryClient()

  useEffect(() => {
    if (!lastNotification) return

    qc.setQueryData<NotificationDto[]>([urls.api.notifications], (curr) =>
      pushOrReplace(curr, lastNotification, "id")
    )
  }, [lastNotification])
}
