import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FlatList, VStack } from "native-base"
import React, { useEffect } from "react"
import { RefreshControl } from "react-native"
import useHideNotificationDotsMutation from "../../../hooks/react-query/notification/useHideNotificationDotsMutation"
import { useNotificationsQuery } from "../../../hooks/react-query/notification/useNotificationsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import FollowNotificationItem from "./FollowNotificationItem/FollowNotificationItem"

const NotificationsScreen = ({
  navigation,
}: NativeStackScreenProps<HomeScreenTypes, "Notifications">) => {
  const { lightBackground } = useMyColors()
  const { data: notifications, isLoading, refetch } = useNotificationsQuery()

  const { mutate: submitHideDots } = useHideNotificationDotsMutation()

  useEffect(() => {
    navigation.addListener("beforeRemove", async (e) => {
      e.preventDefault()
      submitHideDots(undefined, {
        onSettled: () => navigation.dispatch(e.data.action),
      })
    })
  }, [])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      {notifications && notifications.length > 0 && (
        <FlatList
          refreshing={isLoading}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={(props) => {
            if (props.item.follow)
              return (
                <FollowNotificationItem
                  follow={props.item.follow}
                  showDot={props.item.showDot}
                />
              )
            return null
          }}
        />
      )}
    </VStack>
  )
}

export default NotificationsScreen
