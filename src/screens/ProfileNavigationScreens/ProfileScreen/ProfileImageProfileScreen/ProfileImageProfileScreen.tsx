import { Image } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import { useUserInfoQuery } from "../../../../hooks/react-query/user/useUserInfoQuery"
import useAuthStore from "../../../../hooks/zustand/useAuthStore"
import { usePickProfileImage } from "./usePickProfileImage/usePickProfileImage"
interface Props {
  userId: string
  imageIsPressable?: boolean
}

const ProfileImageProfileScreen = (props: Props) => {
  const openImagePickerAsync = usePickProfileImage(props.userId)

  const authUser = useAuthStore((s) => s.authUser)

  const { data: userInfo } = useUserInfoQuery(props.userId)

  return (
    <Pressable
      onPress={() => {
        if (props.userId === authUser?.id) openImagePickerAsync("gallery")
      }}
    >
      <Image
        alt="profile-picture"
        src={
          userInfo?.profile?.pictureUrl ||
          "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
        }
        height="80px"
        width="80px"
        style={{ borderRadius: 100 }}
      />
    </Pressable>
  )
}

export default ProfileImageProfileScreen
