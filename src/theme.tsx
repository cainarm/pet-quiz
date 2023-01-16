import { Kumbh_Sans, PT_Serif } from "@next/font/google";

const primaryFont = PT_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

const secondaryFont = Kumbh_Sans({
  weight: ["200", "400"],
  subsets: ["latin"],
});

const theme = {
  colors: {
    primary: "#d4eaf0",
    secondary: "#fac1c7",
    text: "#040404",
  },
  font: {
    primary: primaryFont,
    secondary: secondaryFont,
  },
};


export default theme;