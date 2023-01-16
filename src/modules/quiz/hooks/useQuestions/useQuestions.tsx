import { useReducer } from "react";
import { Question, QuestionType } from "@/modules/quiz/model/Question";

enum ActionTypes {
  NEXT_PAGE = "NEXT_PAGE",
  PREVIOUS_PAGE = "PREVIOUS_PAGE",
  ADD_MULTIPLE_CHOICE_ANSWER = "ADD_MULTIPLE_CHOICE_ANSWER",
  ADD_SINGLE_CHOICE_ANSWER = "ADD_SINGLE_CHOICE_ANSWER",
}

type State = {
  currentPage: number;
  answers: Record<string, string[]>;
};

type Action =
  | {
      type: ActionTypes.NEXT_PAGE;
    }
  | {
      type: ActionTypes.PREVIOUS_PAGE;
    }
  | {
      type:
        | ActionTypes.ADD_MULTIPLE_CHOICE_ANSWER
        | ActionTypes.ADD_SINGLE_CHOICE_ANSWER;
      answer: string;
      slug: string;
    };

const initialState: State = {
  currentPage: 0,
  answers: {},
};

function quizReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };

    case ActionTypes.PREVIOUS_PAGE:
      if (state.currentPage > 0) {
        return {
          ...state,
          currentPage: state.currentPage - 1,
        };
      } else {
        return state;
      }
    case ActionTypes.ADD_MULTIPLE_CHOICE_ANSWER: {
      const answerIsAlreadySelected = state.answers[action.slug]?.includes(
        action.answer
      );

      return {
        ...state,
        answers: {
          ...state.answers,
          [action.slug]: answerIsAlreadySelected
            ? state.answers[action.slug].filter(
                (answer) => answer !== action.answer
              )
            : [...(state.answers[action.slug] || []), action.answer],
        },
      };
    }

    case ActionTypes.ADD_SINGLE_CHOICE_ANSWER: {
      const answerIsAlreadySelected = state.answers[action.slug]?.includes(
        action.answer
      );

      return {
        ...state,
        answers: {
          ...state.answers,
          [action.slug]: answerIsAlreadySelected ? [] : [action.answer],
        },
      };
    }

    default:
      return state;
  }
}

export function useQuestions(questions: Question[]) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const questionsFilteredBySkipConditions = questions.filter(
    (question) =>
      !question.skipConditions?.every(
        (skipCondition) =>
          state.answers?.[skipCondition.slug]?.includes(skipCondition.value)
      )
  );

  const currentQuestion = questionsFilteredBySkipConditions[state.currentPage];


  function goToNextQuestion() {
    const questionHasAnswers = Boolean(state.answers[currentQuestion.slug]?.length)
    const isNotLastQuestion = state.currentPage < questionsFilteredBySkipConditions.length - 1;

    if (questionHasAnswers && isNotLastQuestion) {
      dispatch({ type: ActionTypes.NEXT_PAGE });
    }
  }

  function goToPreviousQuestion() {
    dispatch({ type: ActionTypes.PREVIOUS_PAGE });
  }

  function addAnswer(answer: string) {
    dispatch({
      type:
        currentQuestion.type === QuestionType.Multiple
          ? ActionTypes.ADD_MULTIPLE_CHOICE_ANSWER
          : ActionTypes.ADD_SINGLE_CHOICE_ANSWER,
      answer,
      slug: currentQuestion.slug,
    });
  }

  return {
    state: {
      currentQuestion,
      questionAnswers: state.answers[currentQuestion.slug] || [],
      isLastQuestion: state.currentPage === questionsFilteredBySkipConditions.length - 1,
      isFirstQuestion: state.currentPage === 0,
      answers: state.answers,
    },
    modifiers: {
      goToNextQuestion,
      goToPreviousQuestion,
      addAnswer,
    },
  };
}
