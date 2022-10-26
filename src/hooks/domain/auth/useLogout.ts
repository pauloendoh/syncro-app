import { useMyToast } from "../../../components/toasts/useMyToast"
import { resetAuthStore } from "../../zustand/useAuthStore"

export const useLogout = () => {
  // const router = useRouter();
  const { showSuccessToast } = useMyToast()

  const logout = () => {
    resetAuthStore()
    showSuccessToast("Logged out!")
    // router.push(urls.pages.index);
  }
  return logout
}
