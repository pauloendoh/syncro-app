export const syncroItemTypes = ["tvSeries", "movie", "game"] as const

export type SyncroItemType = typeof syncroItemTypes[number]
