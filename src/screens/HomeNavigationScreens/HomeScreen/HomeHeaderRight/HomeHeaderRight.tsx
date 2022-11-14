import { Ionicons } from "@expo/vector-icons"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Badge, Box, IconButton, useTheme } from "native-base"
import React, { useMemo } from "react"
import { useNotificationsQuery } from "../../../../hooks/react-query/notification/useNotificationsQuery"
import { HomeScreenTypes } from "../../../../types/HomeScreenTypes"

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

  const { navigate } = useNavigation<NavigationProp<HomeScreenTypes>>()

  return (
    <>
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

        <IconButton onPress={() => navigate("Notifications")}>
          <Ionicons
            name="md-notifications"
            size={20}
            color={theme.colors.dark[900]}
          />
        </IconButton>
      </Box>
    </>
  )
}

export default HomeHeaderRight
