import { extendTheme } from "native-base";

export const myTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#E5FFF7",
      100: "#D3FFF2",
      200: "#7BF0CC",
      300: "#73DEBD",
      400: "#4AD0A7",
      500: "#3DAC8D",
      600: "#1C9875",
      700: "#128665",
      800: "#066F51",
      900: "#014B37",
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
});
