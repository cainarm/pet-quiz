import styled from "styled-components";
import { Heading } from "@/modules/core/components/Typography";
import { useQuestions } from "@/modules/quiz/hooks/useQuestions";
import { PrimaryButton } from "@/modules/core/components/Buttons";
import { Question as QuestionAndChoices } from "@/modules/quiz/components/Question";
import { Question } from "@/modules/quiz/model/Question";

type Props = {
  title: string;
  questions: Question[];
  submitFn: (answers: Record<string, string[]>) => Promise<void>;
  onSuccess: () => void;
};

export function QuizPage({ title, questions, submitFn, onSuccess }: Props) {
  const {
    state: { totalAnswers, currentQuestion, isLastQuestion, isFirstQuestion },
    modifiers: { goToNextQuestion, goToPreviousQuestion, addAnswer },
  } = useQuestions(questions);

  function submitAnswers() {
    submitFn(totalAnswers).finally(() => {
      onSuccess();
    });
  }

  return (
    <Main>
      <Quiz>
        <Heading>{title}</Heading>
        <QuestionAndChoices
          text={currentQuestion.text}
          choices={currentQuestion.choices}
          selectedChoices={currentQuestion.answers}
          onSelect={addAnswer}
        />
        <Buttons>
          <PrimaryButton
            onClick={goToPreviousQuestion}
            disabled={isFirstQuestion}
          >
            Previous
          </PrimaryButton>
          <PrimaryButton
            onClick={isLastQuestion ? submitAnswers : goToNextQuestion}
            disabled={!currentQuestion.answers.length}
          >
            {isLastQuestion ? "Finish" : "Next"}
          </PrimaryButton>
        </Buttons>
      </Quiz>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;

`;

const Quiz = styled.section`
  width: 100%;
  width: 567px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
