export const syncroItemTypes = ["tv series", "movie"] as const

export type SyncroItemType = typeof syncroItemTypes[number]
