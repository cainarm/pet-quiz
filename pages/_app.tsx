import type { AppProps } from "next/app";
import { Open_Sans, Pacifico } from "@next/font/google";
import { ThemeProvider, DefaultTheme } from "styled-components";

const primaryFont = Open_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

const secondaryFont = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
});

const theme = {
  colors: {
    primary: "#c9eddb",
    secondary: "#fac1c7",
    text: "#333333",
    border: "white",
  },
  font: {
    primary: primaryFont,
    title: secondaryFont,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
