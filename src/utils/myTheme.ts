import { extendTheme } from "native-base"

export const myTheme = extendTheme({
  fonts: {
    heading: "NotoSans",
    body: "NotoSans",
    mono: "NotoSans",
  },

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
    secondary: {
      50: "#FFF0FB",
      100: "#FFC5EF",
      200: "#FFA0E5",
      300: "#F387D6",
      400: "#E269C1",
      500: "#C862AC",
      600: "#B25699",
      700: "#8B4377",
      800: "#6C335D",
      900: "#532947",
    },
  },
  components: {
    Input: {
      baseStyle: ({ theme }) => {},
    },
  },

  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
})
