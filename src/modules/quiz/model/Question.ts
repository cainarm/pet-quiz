export enum QuestionType {
  Single = "singleChoice",
  Multiple = "multipleChoice",
}

export type Choice = {
  text: string;
  value: string;
};

type SkipCondition = {
  slug: string;
  value: string;
};

export type Question = {
  slug: string;
  text: string;
  type: QuestionType;
  choices: Choice[];
  skipConditions?: SkipCondition[];
};
