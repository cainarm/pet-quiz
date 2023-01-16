import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Heading } from "@/modules/core/components/Typography";
import {
  fetchAllergiesQuestions,
  submitAllergies,
} from "@/modules/quiz/services/allergies";
import { useQuestions } from "@/modules/quiz/hooks/useQuestions";
import { PrimaryButton } from "@/modules/core/components/Buttons";
import { Question } from "@/modules/quiz/components/Question";

export async function getServerSideProps() {
  const questions = await fetchAllergiesQuestions();

  return {
    props: {
      data: questions,
    },
  };
}

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function Home({ data }: Props) {
  const router = useRouter();

  const {
    state: {
      answers,
      questionAnswers,
      currentQuestion,
      isLastQuestion,
      isFirstQuestion,
    },
    modifiers: { goToNextQuestion, goToPreviousQuestion, addAnswer },
  } = useQuestions(data.questions);

  function submitAnswers() {
    submitAllergies(answers).finally(() => {
      router.push("/report");
    });
  }

  return (
    <Main>
      <Head>
        <title>Pet Quiz</title>
        <meta name="description" content="Pet Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Quiz>
          <Heading>{data.title}</Heading>
          <Question
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
