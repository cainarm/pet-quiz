import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      outline: string;
    };
    font: {
      primary: NextFont;
      secondary: NextFont;
    }
  }
}
