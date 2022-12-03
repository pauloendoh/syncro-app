export const syncroItemTypes = ["tv series", "movie", "game"] as const

export type SyncroItemType = typeof syncroItemTypes[number]
