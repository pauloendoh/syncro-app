import Constants from "expo-constants"

// from app.json -> extra
const envVars = Constants.expoConfig!.extra as {
  API_URL: string
}

export default envVars
