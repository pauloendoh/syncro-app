export const getLabelByRatingValue = (value: number | null) => {
  if (value === 1) return "1 - Horrendous"
  if (value === 2) return "2 - Waste of time"
  if (value === 3) return "3 - Ultra bad"
  if (value === 4) return "4 - Super bad"
  if (value === 5) return "5 - Bad"
  if (value === 6) return "6 - So so"
  if (value === 7) return "7 - Ok"
  if (value === 8) return "8 - Good"
  if (value === 9) return "9 - Very good"
  if (value === 10) return "10 - Perfect!"
  return "Rate"
}
