export const formatCompactNumber = (number: number) => {
  return Intl.NumberFormat("en", { notation: "compact" }).format(number)
}
