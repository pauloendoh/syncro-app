import { useQuery } from "@tanstack/react-query"
import { CustomPositionDto } from "../../../types/domain/custom-position/CustomPositionDto"
import { SyncroItemType } from "../../../types/domain/SyncroItemType"
import { urls } from "../../../utils/urls"

export const useCustomPositionsQuery = (itemType: SyncroItemType) => {
  return useQuery<CustomPositionDto[]>([
    urls.api.customPositionsByItemType(itemType),
  ])
}
