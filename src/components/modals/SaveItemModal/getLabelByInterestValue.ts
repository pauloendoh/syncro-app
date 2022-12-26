export const getLabelByInterestValue = (value: number | null) => {
  if (value) {
    return `${value} - ${getShortLabelByInterestValue(value)}`
  }

  return "Save"
}

export const getShortLabelByInterestValue = (value: number | null) => {
  if (value === 1) return "Not interested"
  if (value === 2) return "Kinda interested"
  if (value === 3) return "Very interested"
  return "Save"
}
