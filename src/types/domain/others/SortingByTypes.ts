export type SortingByTypes = "theirRatingDesc" | "theirInterestDesc"

export const sortingOptions: { type: SortingByTypes; label: string }[] = [
  {
    label: "Rating - highest",
    type: "theirRatingDesc",
  },
  {
    label: "Interest - highest",
    type: "theirInterestDesc",
  },
]
