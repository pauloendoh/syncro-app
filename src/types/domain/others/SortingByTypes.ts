export type SortingByTypes = "theirRatingDesc" | "theirInterestDesc"

export const sortingOptions: { type: SortingByTypes; label: string }[] = [
  {
    label: "Interest - highest",
    type: "theirInterestDesc",
  },
  {
    label: "Rating - highest",
    type: "theirRatingDesc",
  },
]
