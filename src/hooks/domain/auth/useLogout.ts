import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMyToast } from "../../../components/toasts/useMyToast"
import { storageKeys } from "../../../utils/storageKeys"
import { urls } from "../../../utils/urls"
import { useAxios } from "../../useAxios"
import { resetAuthStore } from "../../zustand/useAuthStore"

export const useLogout = () => {
  const { showSuccessToast } = useMyToast()
  const axios = useAxios()

  const logout = async () => {
    const pushToken = await AsyncStorage.getItem(storageKeys.pushToken)
    if (pushToken)
      await axios
        .delete(urls.api.logoutPushToken(pushToken))
        .then((res) => res.data)

    resetAuthStore()
    showSuccessToast("Logged out!")
  }
  return logout
}
