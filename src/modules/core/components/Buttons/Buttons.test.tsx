import React from "react";
import { render, screen, fireEvent } from "@/tests";
import { PrimaryButton } from "./";
import { describe, it, expect, vi } from "vitest";

describe("PrimaryButton", () => {
  it("should render the button and click it", () => {
    const clickHandler = vi.fn();

    render(<PrimaryButton onClick={clickHandler}>Click me</PrimaryButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Click me"));

    expect(clickHandler).toHaveBeenCalled();
  });
});
