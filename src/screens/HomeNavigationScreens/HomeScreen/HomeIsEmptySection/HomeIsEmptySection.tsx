import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Box, Text, useTheme } from "native-base"
import React from "react"
import { NavigationParamType } from "../../../../types/NavigationParamType"

interface Props {
  test?: string
}

const HomeIsEmptySection = (props: Props) => {
  const theme = useTheme()

  const { navigate } = useNavigation<NavigationProp<NavigationParamType>>()

  return (
    <Box mt={5} px={3}>
      <Text>
        Your feed is empty. Start following some{" "}
        <Text
          style={{
            color: theme.colors.primary[500],
          }}
          onPress={() => navigate("DiscoverNavigation")}
        >
          users
        </Text>
        .
      </Text>
    </Box>
  )
}

export default HomeIsEmptySection
