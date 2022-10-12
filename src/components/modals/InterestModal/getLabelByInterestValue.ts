export const getLabelByInterestValue = (value: number | null) => {
  if (value === 1) return "1 - Not interested"
  if (value === 2) return "2 - Kinda interested"
  if (value === 3) return "3 - Very interested"
  return "Save"
}
