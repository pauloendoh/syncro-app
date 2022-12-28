import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Badge, Box, IconButton, useTheme } from "native-base"
import React, { useMemo } from "react"
import { useNotificationsQuery } from "../../../../hooks/react-query/notification/useNotificationsQuery"
import { useNewNotificationSocket } from "../../../../hooks/socket/useNewNotificationSocket"
import { useMySocketEvent } from "../../../../hooks/useMySocketEvent"
import { HomeScreenTypes } from "../../../../types/HomeScreenTypes"
import HStackVCenter from "../../../_common/flexboxes/HStackVCenter"

interface Props {
  test?: string
}

const HomeHeaderRight = (props: Props) => {
  const { data: notifications, refetch } = useNotificationsQuery()

  const unseenNotifications = useMemo(
    () => notifications?.filter((n) => n.showDot) || [],
    [notifications]
  )

  const theme = useTheme()

  useNewNotificationSocket()

  const { navigate, push } = useNavigation<
    NativeStackNavigationProp<HomeScreenTypes>
  >()

  useMySocketEvent("notification")

  return (
    <HStackVCenter space={4}>
      <Box>
        <IconButton onPress={() => push("MyNextItems")}>
          <MaterialIcons
            name="collections-bookmark"
            size={20}
            color={theme.colors.dark[900]}
          />
        </IconButton>
      </Box>
      <Box>
        {unseenNotifications.length > 0 && (
          <Badge // bg="red.400"
            colorScheme="danger"
            rounded="full"
            position="absolute"
            right={-4}
            size="sm"
            zIndex={1}
            variant="solid"
            alignSelf="flex-end"
            _text={{
              fontSize: 10,
            }}
          >
            {unseenNotifications.length}
          </Badge>
        )}

        <IconButton onPress={() => push("Notifications")}>
          <Ionicons
            name="md-notifications"
            size={20}
            color={theme.colors.dark[900]}
          />
        </IconButton>
      </Box>
    </HStackVCenter>
  )
}

export default HomeHeaderRight
