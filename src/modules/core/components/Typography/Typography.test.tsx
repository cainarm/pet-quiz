import React from "react";
import { render, screen } from "@/tests";
import { Heading, Paragraph } from "./";
import { describe, it, expect } from "vitest";

describe("Heading", () => {
  it.each([["h1", "h2", "h3", "h4", "h5", "h6"] as const])(
    'should render heading with variant "%s"',
    (variant) => {
      render(<Heading variant={variant}>Hello World</Heading>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
      expect(screen.getByText("Hello World").tagName).toBe(
        variant.toUpperCase()
      );
    }
  );
});

describe("Paragraph", () => {
  it.each([["span", "div", "p"] as const])(
    'should render paragraph with variant "%s"',
    (variant) => {
      render(<Paragraph variant={variant}>Hello World</Paragraph>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
      expect(screen.getByText("Hello World").tagName).toBe(
        variant.toUpperCase()
      );
    }
  );
});
