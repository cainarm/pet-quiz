import { Kumbh_Sans, PT_Serif, Bitter } from "@next/font/google";

const primaryFont = Bitter({
  weight: ["300"],
  subsets: ["latin"],
});

const secondaryFont = Kumbh_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

const theme = {
  colors: {
    primary: "#d4eaf0",
    secondary: "#C9EDDB",
    text: "#040404",
    outline: "#fac1c7",
  },
  font: {
    primary: primaryFont,
    secondary: secondaryFont,
  },
};

export default theme;
