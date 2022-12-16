import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {
  Box,
  HStack,
  Pressable,
  Text,
  useTheme,
  View,
  VStack,
} from "native-base"
import React from "react"
import { format } from "timeago.js"
import UserProfilePicture from "../../../../components/UserProfilePicture/UserProfilePicture"
import useAuthStore from "../../../../hooks/zustand/useAuthStore"
import { FollowDto } from "../../../../types/domain/follow/FollowDto"
import { HomeScreenTypes } from "../../../../types/HomeScreenTypes"
import FollowUnfollowButton from "../../../ProfileNavigationScreens/ProfileScreen/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton"
interface Props {
  follow: FollowDto
  showDot: boolean
}

const FollowNotificationItem = ({ follow, ...props }: Props) => {
  const { push } = useNavigation<NativeStackNavigationProp<HomeScreenTypes>>()
  const authUser = useAuthStore((s) => s.authUser)

  const theme = useTheme()

  // copy of UserSearchItem
  return (
    <Pressable
      key={follow.followerId}
      onPress={() => push("Profile", { userId: follow.followerId })}
    >
      <HStack justifyContent="space-between" p={4}>
        <HStack>
          <UserProfilePicture userId={follow.followerId} widthHeigth={36} />

          <VStack ml={4}>
            <Text maxWidth={200}>
              <Text fontWeight={"semibold"}>{follow.follower?.username}</Text>{" "}
              is following you.
              {props.showDot && (
                <Box>
                  <Box
                    style={{
                      backgroundColor: theme.colors.primary[500],
                      minWidth: 8,
                      minHeight: 8,
                      borderRadius: 8,
                      marginLeft: 8,
                    }}
                  />
                </Box>
              )}
            </Text>

            <Text fontSize="sm">{format(follow.createdAt)}</Text>
          </VStack>
        </HStack>
        <HStack width={100}>
          <Box>
            <View>
              {<FollowUnfollowButton profileUserId={follow.followerId} />}
            </View>
          </Box>
        </HStack>
      </HStack>
    </Pressable>
  )
}

export default FollowNotificationItem
