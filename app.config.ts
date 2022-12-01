import { ExpoConfig } from "@expo/config-types"
import { config } from "dotenv"
config()

const { SENTRY_AUTH_TOKEN } = process.env

export default () => ({
  expo: {
    owner: "pauloendoh",
    name: "Syncro",
    slug: "syncro",
    version: "2.0.2",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "cover",
      backgroundColor: "#1E1E1E",
    },

    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#151515",
      },

      package: "com.pauloendoh.syncro",
      versionCode: 2,
    },
    androidNavigationBar: {
      backgroundColor: "#1E1E1E",
    },
    androidStatusBar: {
      barStyle: "dark-content",
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
          cameraPermission: "Allow app to access your camera.",
        },
      ],
      "sentry-expo",
    ],
    extra: {
      API_URL: process.env.API_URL || null,
      eas: {
        projectId: "2f8c898a-7d0b-46ac-b38a-0471c72c1d7d",
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      fallbackToCacheTimeout: 60000,
      url: "https://u.expo.dev/2f8c898a-7d0b-46ac-b38a-0471c72c1d7d",
    },
  } as ExpoConfig,
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: "lambda3",
          project: "clothes-server",
          authToken:
            "df599338e1e14f9e920be24339adf0a618488e3326024655a9677ed802b21269",
        },
      },
    ],
  },
})
