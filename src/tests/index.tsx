import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: "#d4eaf0",
          secondary: "#fac1c7",
          text: "#040404",
        },

        font: {
          primary: {
            style: {
              fontFamily: "Arial",
            },
          },
          secondary: {
            style: {
              fontFamily: "Arial",
            },
          },
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
