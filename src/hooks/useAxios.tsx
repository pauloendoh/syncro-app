import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { ValidationError } from "class-validator"
import { useMyToast } from "../components/toasts/useMyToast"

export const useAxios = () => {
  const { showErrorToast } = useMyToast()
  const myAxios = axios.create()
  myAxios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

  myAxios.interceptors.request.use(async (config) => {
    const userStr = await AsyncStorage.getItem("user")

    if (userStr && config.headers)
      config.headers["authorization"] = JSON.parse(userStr).token
    return config
  })

  myAxios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // unauthenticated -> go to "/"
      if (error?.response?.status === 401) {
        console.error("UNAUTHENTICATED. PLEASE REDIRECT!!11")
      }

      if (
        axios.isAxiosError<{ errors: ValidationError[]; message: string }>(
          error
        )
      ) {
        const constraints = error.response?.data?.errors?.[0].constraints
        if (constraints) {
          const [key, value] = Object.entries(constraints)[0]

          showErrorToast(value)

          return Promise.reject(error)
        }

        const message = error.response?.data.message || error.message
        showErrorToast(message)
      }

      return Promise.reject(error)
    }
  )

  return myAxios
}
