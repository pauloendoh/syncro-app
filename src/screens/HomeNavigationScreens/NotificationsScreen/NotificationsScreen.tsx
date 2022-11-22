import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FlatList, VStack } from "native-base"
import React, { useEffect, useMemo } from "react"
import { RefreshControl } from "react-native"
import useHideNotificationDotsMutation from "../../../hooks/react-query/notification/useHideNotificationDotsMutation"
import { useNotificationsQuery } from "../../../hooks/react-query/notification/useNotificationsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import FollowNotificationItem from "./FollowNotificationItem/FollowNotificationItem"
import ItemRecommendationNotificationItem from "./ItemRecommendationNotificationItem/ItemRecommendationNotificationItem"

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

  const sortedNotifications = useMemo(
    () =>
      notifications?.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) ||
      [],
    [notifications]
  )

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <FlatList
        refreshing={isLoading}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        data={sortedNotifications}
        keyExtractor={(item) => item.id}
        renderItem={(props) => {
          if (props.item.follow)
            return (
              <FollowNotificationItem
                follow={props.item.follow}
                showDot={props.item.showDot}
              />
            )
          if (props.item.itemRecommendation)
            return (
              <ItemRecommendationNotificationItem
                itemRecommendation={props.item.itemRecommendation}
                showDot={props.item.showDot}
              />
            )
          return null
        }}
      />
    </VStack>
  )
}

export default NotificationsScreen
