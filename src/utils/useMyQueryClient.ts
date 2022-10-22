import { QueryClient, QueryFunction } from "@tanstack/react-query"
import { useAxios } from "../hooks/useAxios"

export const useMyQueryClient = () => {
  const axios = useAxios()
  const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
    const { data } = await axios.get(String(queryKey[0]))
    return data
  }

  // provide the default query function to your app with defaultOptions
  return new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
      },
    },
  })
}
