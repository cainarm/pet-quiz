import { vi, describe, it, expect, beforeEach } from "vitest";
import { screen, render, fireEvent, waitFor } from "@/tests";
import { QuestionType } from "@/modules/quiz/model/Question";
import { QuizPage } from "../Quiz";

describe("index page", () => {
  const props = {
    title: "Allergies Quiz",
    questions: [
      {
        slug: "earInfections",
        text: "Does your dog get ear infections?",
        type: QuestionType.Single,
        choices: [
          {
            text: "Yes",
            value: "yes",
          },
          {
            text: "No",
            value: "no",
          },
        ],
      },
      {
        slug: "earInfectionsFrequency",
        text: "How frequently does your dog get ear infections?",
        type: QuestionType.Multiple,
        skipConditions: [
          {
            slug: "earInfections",
            value: "no",
          },
        ],
        choices: [
          {
            text: "Once a month",
            value: "monthly",
          },
          {
            text: "Every other month",
            value: "bimonthly",
          },
          {
            text: "Twice a year",
            value: "biannually",
          },
          {
            text: "Once a year",
            value: "annually",
          },
        ],
      },
      {
        slug: "redSoreBaldPatches",
        text: "Does your dog get red, sore or bald patches?",
        type: QuestionType.Multiple,
        choices: [
          {
            text: "Yes",
            value: "yes",
          },
          {
            text: "No",
            value: "no",
          },
        ],
      },
      {
        slug: "scalyUnderarms",
        text: "Does your dog have scaly areas in their underarms?",
        type: QuestionType.Multiple,
        choices: [
          {
            text: "Yes",
            value: "yes",
          },
          {
            text: "No",
            value: "no",
          },
        ],
      },
    ],
    submitFn: vi.fn().mockResolvedValue({}),
    onSuccess: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render list, previous button should be disabled",  () => {
    render(<QuizPage {...props} />);

    expect(
      screen.getByRole("heading", { name: "Allergies Quiz" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Does your dog get ear infections?")
    ).toBeInTheDocument();

    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();

    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();

    fireEvent.click(screen.getByText("Yes"));

    expect(screen.getByText("Next")).not.toBeDisabled();
  });

  it("should skip questions that satifies skipConditions", () => {
    render(<QuizPage {...props} />);

    fireEvent.click(screen.getByText("No"));
    fireEvent.click(screen.getByText("Next"));

    expect(
      screen.getByText("Does your dog get red, sore or bald patches?")
    ).toBeInTheDocument();
  });

  it("at the end of the test should redirect to a report page", async () => {
    render(<QuizPage {...props} />);

    expect(
      screen.getByText("Does your dog get ear infections?")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Yes"));
    fireEvent.click(screen.getByText("Next"));

    expect(
      screen.getByText("How frequently does your dog get ear infections?")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Once a month"));
    fireEvent.click(screen.getByText("Next"));

    expect(
      screen.getByText("Does your dog get red, sore or bald patches?")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Yes"));
    fireEvent.click(screen.getByText("Next"));

    expect(
      screen.getByText("Does your dog have scaly areas in their underarms?")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Yes"));
    fireEvent.click(screen.getByText("Finish"));

    expect(props.submitFn).toHaveBeenCalledWith({
      earInfections: ["yes"],
      earInfectionsFrequency: ["monthly"],
      redSoreBaldPatches: ["yes"],
      scalyUnderarms: ["yes"],
    });

    await waitFor(() => {
      expect(props.onSuccess).toHaveBeenCalled();
    })
  });
});
