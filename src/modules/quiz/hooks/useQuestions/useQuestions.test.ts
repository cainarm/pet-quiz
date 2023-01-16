import { expect, describe, it } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useQuestions } from "./useQuestions";
import { Question, QuestionType } from "@/modules/quiz/model/Question";

describe("useQuestions", () => {
  const questions: Question[] = [
    {
      slug: "question1",
      text: "What is your favorite color?",
      type: QuestionType.Single,
      choices: [
        {
          text: "Red",
          value: "red",
        },
        {
          text: "Blue",
          value: "blue",
        },
      ],
    },
    {
      slug: "question2",
      text: "What are your hobbies?",
      type: QuestionType.Multiple,
      choices: [
        {
          text: "Reading",
          value: "reading",
        },
        {
          text: "Writing",
          value: "writing",
        },
      ],
      skipConditions: [
        {
          slug: "question1",
          value: "blue",
        },
      ],
    },
    {
      slug: "question3",
      text: "What is your age?",
      type: QuestionType.Single,
      choices: [
        {
          text: "18-25",
          value: "18-25",
        },
        {
          text: "26-35",
          value: "26-35",
        },
      ],
    },
  ];

  it("should set the current question to the first question on initial render", () => {
    const { result } = renderHook(() => useQuestions(questions));
    expect(result.current.state.currentQuestion.slug).toEqual(questions[0].slug);
  });

  it('should set the current question to the next question after "goToNextQuestion" is called', async () => {
    const { result } = renderHook(() => useQuestions(questions));
    act(() => {
      result.current.modifiers.addAnswer("red");
    });

    act(() => {
      result.current.modifiers.goToNextQuestion();
    });

    await waitFor(() => {
      expect(result.current.state.currentQuestion.slug).toEqual(
        questions[1].slug
      );
    });
  });

  it('should set the current question to the previous question after "goToPreviousQuestion" is called', () => {
    const { result } = renderHook(() => useQuestions(questions));
    act(() => {
      result.current.modifiers.addAnswer("red");
    });

    act(() => {
      result.current.modifiers.goToNextQuestion();
    });

    act(() => {
      result.current.modifiers.goToPreviousQuestion();
    });

    expect(result.current.state.currentQuestion.slug).toEqual(
      questions[0].slug
    );
  });

  it('should add an answer to the "answers" state when "addAnswer" is called', () => {
    const { result } = renderHook(() => useQuestions(questions));
    act(() => {
      result.current.modifiers.addAnswer("red");
    });

    expect(result.current.state.currentQuestion.answers).toEqual(["red"]);
  });

  it('should remove an answer from the "answers" state when "addAnswer" is called with the same answer for multiple choice question', () => {
    const { result } = renderHook(() => useQuestions(questions));
    act(() => {
      result.current.modifiers.goToNextQuestion();
    });

    act(() => {
      result.current.modifiers.addAnswer("reading");
    });

    act(() => {
      result.current.modifiers.addAnswer("reading");
    });

    expect(result.current.state.currentQuestion.answers).toEqual([]);
  });

  it('should allow user to add multiple answers to the "answers" state when "addAnswer" is called for multiple choice question', () => {
    const { result } = renderHook(() =>
      useQuestions(questions.slice(1, questions.length))
    );

    act(() => {
      result.current.modifiers.addAnswer("writing");
    });

    act(() => {
      result.current.modifiers.addAnswer("reading");
    });

    expect(result.current.state.currentQuestion.answers).toEqual(["writing", "reading"]);
  });

  it('should replace answer when "addAnswer" is called for single choice question', () => {
    const { result } = renderHook(() => useQuestions(questions));
    act(() => {
      result.current.modifiers.addAnswer("red");
    });

    act(() => {
      result.current.modifiers.addAnswer("blue");
    });

    expect(result.current.state.currentQuestion.answers).toEqual(["blue"]);
  });

  it("should skip out questions do not meet skipConditions criteria", () => {
    const { result } = renderHook(() => useQuestions(questions));

    act(() => {
      result.current.modifiers.addAnswer("blue");
    });

    act(() => {
      result.current.modifiers.goToNextQuestion();
    });

    expect(result.current.state.currentQuestion.slug).toEqual(
      questions[2].slug
    );
  });

  it('should not do anything if "goToNextQuestion" is called on the last question', () => {
    const { result } = renderHook(() => useQuestions(questions));
    act(() => {
      result.current.modifiers.addAnswer("red");
    });

    act(() => {
      result.current.modifiers.goToNextQuestion();
    });

    act(() => {
      result.current.modifiers.addAnswer("Reading");
    });

    act(() => {
      result.current.modifiers.goToNextQuestion();
    });

    act(() => {
      result.current.modifiers.addAnswer("18-25");
    });

    act(() => {
      result.current.modifiers.goToNextQuestion();
    });

    expect(result.current.state.currentQuestion.slug).toEqual(
      questions[2].slug
    );
  });
});
