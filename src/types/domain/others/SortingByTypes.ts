export type SortingByTypes =
  | "theirRatingDesc"
  | "theirInterestDesc"
  | "customOrdering"
  | "avgInterest"

type SortingOption = {
  type: SortingByTypes
  label: string
}

export const getSortingOptions = (thisIsYourList = false): SortingOption[] => {
  const options: SortingOption[] = [
    {
      label: "⭐ Rating - highest",
      type: "theirRatingDesc",
    },
    {
      label: "🔥 Interest - highest",
      type: "theirInterestDesc",
    },
  ]

  if (thisIsYourList)
    return [...options, { label: "Custom ordering", type: "customOrdering" }]

  return [
    ...options,
    { label: "⭐ Average interest - highest", type: "avgInterest" },
  ]
}
