import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { CustomPositionDto } from "../../../types/domain/custom-position/CustomPositionDto"
import { SyncroItemType } from "../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import myAxios from "../../../utils/myAxios"
import { urls } from "../../../utils/urls"

type Payload = {
  dto: CustomPositionDto
  itemType: SyncroItemType
}

const useChangeCustomPositionMutation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useMyToast()

  return useMutation(
    ({ dto }: Payload) =>
      myAxios
        .put<CustomPositionDto[]>(urls.api.customPosition, dto)
        .then((res) => res.data),
    {
      onSuccess: (_, payload) => {
        queryClient
          .invalidateQueries([
            urls.api.customPositionsByItemType(payload.itemType),
          ])
          .then(() => {
            showSuccessToast("Position changed!")
          })
      },
    }
  )
}

export default useChangeCustomPositionMutation
