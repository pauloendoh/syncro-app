import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "native-base";
import { TagPostDto } from "../../../types/domain/tag/TagPostDto";
import pushOrReplace from "../../../utils/array/pushOrReplace";
import myAxios from "../../../utils/myAxios";
import { urls } from "../../../utils/urls";

const useSaveTagMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    (payload: TagPostDto) =>
      myAxios.post(urls.api.tags, payload).then((res) => res.data),
    {
      onSuccess: (resData) => {
        toast.show({
          description: "Tag saved!",
          duration: 2000,
        });

        queryClient.setQueryData<TagPostDto[]>([urls.api.tags], (currTags) => {
          if (!currTags) return [];

          return pushOrReplace(currTags, resData, "name"); // CHANGE
        });
      },
      onError: (err: Error) => {
        toast.show({
          description: err.message,
        });
      },
    }
  );
};

export default useSaveTagMutation;
