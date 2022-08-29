import { useQuery } from "@tanstack/react-query";
import { TagGetDto } from "../../../types/domain/tag/TagGetDto";
import { urls } from "../../../utils/urls";

export const useTagsQuery = () => {
  return useQuery<TagGetDto[], Error>([urls.api.tags]);
};
