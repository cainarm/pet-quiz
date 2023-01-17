import { Question } from "@/modules/quiz/model/Question";

export function fetchAllergiesQuestions() {
  return fetch(
    "https://sch-health-backend-stage.herokuapp.com/quizzes/allergies"
  )
    .then<{
      data: {
        title: string;
        questions: Question[];
      };
    }>((res) => res.json())
    .then((res) => res.data);
}

export function submitAllergies(answers: Record<string, string[]>) {
  return fetch(
    "https://sch-health-backend-stage.herokuapp.com/quizzes/allergies/answers",
    {
      method: "POST",
      body: JSON.stringify(answers),
    }
  ).then((res) => res.json());
}
