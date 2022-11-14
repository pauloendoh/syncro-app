import { useTheme } from "native-base"
import { useMyColors } from "../../../hooks/useMyColors"

export const useGetSecondaryColorByInterest = () => {
  const theme = useTheme()
  const { ratingYellow } = useMyColors()
  const getByInterest = (rating?: number | null) => {
    switch (rating) {
      case 1:
        return "#575256"
      case 2:
        return "#6e5667"
      case 3:
        return theme.colors.secondary[500]
      default:
        return theme.colors.gray[500]
    }
  }

  return getByInterest
}
