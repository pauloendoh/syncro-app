import { SyncroItemType } from "../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"

export const selectItemTypes = [
  {
    key: "tv series",
    label: "TV Series",
  },
  {
    key: "movie",
    label: "Movies",
  },
] as { key: SyncroItemType; label: string }[]
