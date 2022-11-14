import { useTheme } from "native-base"
import { useMyColors } from "../../../hooks/useMyColors"

export const useGetSecondaryColorByRating = () => {
  const theme = useTheme()
  const { ratingYellow } = useMyColors()
  const getByRating = (rating?: number | null) => {
    switch (rating) {
      case 1:
      case 2:
      case 3:
        return "#575256"
      case 4:
        return "#63565f"
      case 5:
        return "#6e5667"
      case 6:
        return "#805d76"

      case 7:
        return "#966488"
      case 8:
        return "#a36191"
      case 9:
        return "#aa5c95"
      case 10:
        return theme.colors.secondary[500]
      default:
        return theme.colors.gray[500]
    }
  }

  return getByRating
}
