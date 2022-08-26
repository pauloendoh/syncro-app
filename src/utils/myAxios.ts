import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const myAxios = axios.create();
myAxios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

myAxios.interceptors.request.use(async (config) => {
  const userStr = await AsyncStorage.getItem("user");

  if (userStr && config.headers)
    config.headers["authorization"] = JSON.parse(userStr).token;
  return config;
});

myAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // unauthenticated -> go to "/"
    if (error?.response?.status === 401) {
      console.error("UNAUTHENTICATED. PLEASE REDIRECT!!11");
    }
    return Promise.reject(error);
  }
);

export default myAxios;
