import { resetAuthStore } from "../../zustand/useAuthStore";

export const useLogout = () => {
  // const router = useRouter();

  const logout = () => {
    resetAuthStore();
    // router.push(urls.pages.index);
  };
  return logout;
};
