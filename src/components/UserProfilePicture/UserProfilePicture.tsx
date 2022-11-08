import { Image } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import { useUserInfoQuery } from "../../hooks/react-query/user/useUserInfoQuery"

interface Props {
  onPress?: () => void
  userId: string
  widthHeigth: number
}

const UserProfilePicture = (props: Props) => {
  const { data: userInfo } = useUserInfoQuery(props.userId)

  return (
    <Pressable disabled={!props.onPress} onPress={props.onPress}>
      <Image
        alt={userInfo?.username || "loading-profile-picture"}
        width={props.widthHeigth + "px"}
        height={props.widthHeigth + "px"}
        style={{ borderRadius: props.widthHeigth }}
        src={
          userInfo?.profile?.pictureUrl ||
          "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
        }
      />
    </Pressable>
  )
}

export default UserProfilePicture
