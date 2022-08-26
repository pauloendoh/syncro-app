import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { AuthUserGetDto } from "../../../types/domain/auth/AuthUserGetDto";
import myAxios from "../../../utils/myAxios";
import { urls } from "../../../utils/urls";
import useAuthStore from "../../zustand/useAuthStore";
import { useLogout } from "./useLogout";

const useCheckAuthOrLogout = () => {
  // const logout = useLogoutAndPushIndex();
  const logout = useLogout();

  const [loading, setLoading] = useState(true);

  const { setAuthUser } = useAuthStore();

  const checkAuthOrLogout = async () => {
    const userCookieStr = await AsyncStorage.getItem("user");
    // const googleSession = getCookie('endoh_google_session')

    if (!userCookieStr) {
      return setLoading(false);
    } else {
      // Regular login
      const user: AuthUserGetDto = JSON.parse(userCookieStr);
      if (new Date(user.expiresAt) <= new Date()) {
        logout();
        return setLoading(false);
      }

      myAxios
        .get<AuthUserGetDto>(urls.api.me)
        .then((res) => {
          setAuthUser(res.data);
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    }
  };

  return { checkAuthOrLogout, loading };
};

export default useCheckAuthOrLogout;
