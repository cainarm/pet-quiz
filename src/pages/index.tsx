import Head from "next/head";
import { useRouter } from "next/router";
import {
  fetchAllergiesQuestions,
  submitAllergies,
} from "@/modules/quiz/services/allergies";
import { QuizPage } from "@/modules/quiz/templates/Quiz";

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

  return (
    <>
      <Head>
        <title>Pet Quiz</title>
        <meta name="description" content="Pet Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QuizPage
        title={data.title}
        questions={data.questions}
        submitFn={submitAllergies}
        onSuccess={() => router.push("/report")}
      />
    </>
  );
}
