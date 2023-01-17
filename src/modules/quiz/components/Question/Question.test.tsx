import { vi, describe, it, expect, beforeEach } from "vitest";
import { screen, render, fireEvent } from "@/tests";
import { Question } from "./Question";

describe("Question", () => {
  const props = {
    text: "What is your favorite drink?",
    choices: [
      { value: "coffee", text: "Coffee" },
      { value: "tea", text: "Tea" },
      { value: "water", text: "Water" },
    ],
    onSelect: vi.fn(),
    selectedChoices: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the question text and choices", () => {
    render(<Question {...props} />);
    expect(
      screen.getByText("What is your favorite drink?")
    ).toBeInTheDocument();

    props.choices.forEach((choice) =>
      expect(screen.getByText(choice.text)).toBeInTheDocument()
    );
  });

  it("calls the onSelect callback when a choice is selected", () => {
    render(<Question {...props} />);

    fireEvent.click(screen.getByText("Coffee"));

    expect(props.onSelect).toHaveBeenCalledWith("coffee");
  });

  it("highlight the selected choice", () => {
    render(<Question {...props} selectedChoices={["tea"]} />);

    expect(screen.getByText("Tea").parentElement).toHaveAttribute("aria-selected", "true");
  });

  it("should call onSelect when enter key is pressed", () => {
    render(<Question {...props} />);
    fireEvent.keyDown(screen.getByText("Water"), { key: "Enter", code: 13 });
    expect(props.onSelect).toHaveBeenCalledWith("water");
  });
});
