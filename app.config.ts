import { ExpoConfig } from "@expo/config-types";

export default () => ({
  expo: {
    name: "endoh-app",
    slug: "endoh-app",
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
        projectId: "6a4a530d-c5cd-4d55-859e-26df6f2ee20b",
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
});
