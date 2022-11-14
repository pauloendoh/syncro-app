import { useTheme } from "native-base"
import { useMyColors } from "../../../hooks/useMyColors"

export const useGetYellowColorByInterest = () => {
  const theme = useTheme()
  const { ratingYellow } = useMyColors()

  const getByRating = (rating?: number | null) => {
    switch (rating) {
      case 1:
        return "#968864"
      case 2:
        return "#aa8833"
      case 3:
        return ratingYellow
      default:
        return theme.colors.gray[500]
    }
  }

  return getByRating
}
