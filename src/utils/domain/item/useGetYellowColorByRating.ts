import { useTheme } from "native-base"
import { useMyColors } from "../../../hooks/useMyColors"

export const useGetYellowColorByRating = () => {
  const theme = useTheme()
  const { ratingYellow } = useMyColors()
  const getByRating = (rating?: number | null) => {
    switch (rating) {
      case 1:
      case 2:
      case 3:
        return "#69604a"
      case 4:
        return "#77612a"
      case 5:
        return "#8f7124"
      case 6:
        return "#a67f1d"

      case 7:
        return "#c08f14"
      case 8:
        return "#d79e10"
      case 9:
        return "#e6a709"
      case 10:
        return ratingYellow
      default:
        return theme.colors.gray[500]
    }
  }

  return getByRating
}
