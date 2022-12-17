import { Link, Text, useTheme, VStack } from "native-base"
import React from "react"
import { ProfileDto } from "../../../../types/domain/profile/ProfileDto"
import MyViewMoreText from "../../../_common/text/MyViewMoreText/MyViewMoreText"

interface Props {
  userProfile: ProfileDto
}

const ProfileInfoProfileScreen = (props: Props) => {
  const theme = useTheme()
  return (
    <VStack space={2}>
      {props.userProfile.fullName.length > 0 && (
        <Text fontWeight={"semibold"}>{props.userProfile.fullName}</Text>
      )}

      {props.userProfile.bio.length > 0 && (
        <MyViewMoreText
          numberOfLines={5}
          // renderViewMore={this.renderViewMore}
          // renderViewLess={this.renderViewLess}
        >
          <Text>{props.userProfile.bio}</Text>
        </MyViewMoreText>
      )}
      {props.userProfile.websiteUrl.length > 0 && (
        <Link
          href={props.userProfile.websiteUrl}
          _text={{ color: "primary.500" }}
        >
          {props.userProfile.websiteUrl}
        </Link>
      )}
    </VStack>
  )
}

export default ProfileInfoProfileScreen
