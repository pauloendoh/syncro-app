import { Image } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Pressable, Text } from "native-base"
import React from "react"
import { useImdbItemDetailsQuery } from "../../../../hooks/react-query/imdb-item/useImdbItemDetailsQuery"
import VStackHCenter from "../../../_common/flexboxes/VStackHCenter"
import { ProfileScreenNavigationProp } from "../ProfileScreen"

interface Props {
  thumbnailImdbItemId: string
  userId: string
  ratingsCount: number
}

const ProfileScreenRatingItem = (props: Props) => {
  const { navigation } = useNavigation<ProfileScreenNavigationProp>()

  const { data: imdbItem } = useImdbItemDetailsQuery(props.thumbnailImdbItemId)

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("UserRatings", {
          itemType: "tv series",
          userId: props.userId,
        })
      }}
    >
      <VStackHCenter width={150}>
        <Image
          source={{ uri: imdbItem?.imageUrl }}
          style={{
            width: 150,
            height: 150,
          }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: "500" }} mt={1}>
          TV Series
        </Text>
        <Text>{props.ratingsCount} ratings</Text>
      </VStackHCenter>
    </Pressable>
  )
}

export default ProfileScreenRatingItem
