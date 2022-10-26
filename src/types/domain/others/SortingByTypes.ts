export type SortingByTypes = "theirRatingDesc" | "theirInterestDesc"

export const sortingOptions: { type: SortingByTypes; label: string }[] = [
  {
    label: "Their interest - highest",
    type: "theirInterestDesc",
  },
  {
    label: "Their rating - highest",
    type: "theirRatingDesc",
  },
]
