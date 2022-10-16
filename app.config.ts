import { ExpoConfig } from "@expo/config-types"
import { config } from "dotenv"
config()

const { SENTRY_AUTH_TOKEN } = process.env

export default () => ({
  expo: {
    owner: "pauloendoh",
    name: "ration-app",
    slug: "ration-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#1E1E1E",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#151515",
      },
      permissions: ["android.permission.RECORD_AUDIO"],
      package: "com.pauloendoh.endohapp",
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
        projectId: "c002a7ca-4fc6-4cc7-925b-8f68f88f47b1",
      },
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
