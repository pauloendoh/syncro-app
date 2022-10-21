import Constants from "expo-constants"

console.log({
  constants: Constants,
})
// from app.json -> extra
const envVars = Constants.expo.extra as {
  API_URL: string
}

export default envVars
