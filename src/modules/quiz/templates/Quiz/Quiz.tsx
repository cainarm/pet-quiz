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
    state: {
      answers,
      questionAnswers,
      currentQuestion,
      isLastQuestion,
      isFirstQuestion,
    },
    modifiers: { goToNextQuestion, goToPreviousQuestion, addAnswer },
  } = useQuestions(questions);

  function submitAnswers() {
    submitFn(answers).finally(() => {
      onSuccess();
    });
  }

  return (
    <Main>
      <Content>
        <Quiz>
          <Heading>{title}</Heading>
          <QuestionAndChoices
            text={currentQuestion.text}
            choices={currentQuestion.choices}
            selectedChoices={questionAnswers}
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
              disabled={!questionAnswers.length}
            >
              {isLastQuestion ? "Finish" : "Next"}
            </PrimaryButton>
          </Buttons>
        </Quiz>
      </Content>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const Quiz = styled.section`
  width: 100%;
  width: 36rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Content = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  max-width: 122.8rem;
  padding: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
