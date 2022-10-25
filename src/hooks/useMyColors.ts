import { useTheme } from "native-base"

export const useMyColors = () => {
  const theme = useTheme()

  return {
    lightBackground: theme.colors.light[800],

    ratingYellow: "#FFB600",
  }
}
