import {
  QuestionType,
  Section,
  SubSection,
} from "@/constants/question-constants";

export const SECTION_CHOICE_LABELS = {
  [Section.ENGLISH]: "English",
  [Section.MATH]: "Math",
};

export const SECTION_CHOICE_MAP: { [key in QuestionType]?: Section[] } = {
  [QuestionType.MULTIPLE_CHOICE]: [Section.ENGLISH, Section.MATH],
  [QuestionType.FILL_IN]: [Section.MATH],
  [QuestionType.MULTIPLE_CHOICE_IMAGE]: [Section.ENGLISH, Section.MATH],
  [QuestionType.FILL_IN_IMAGE]: [Section.MATH],
};

export const SUB_SECTION_CHOICE_LABELS = {
  [SubSection.MATH_FILL_IN]: "Math Fill-in",
  [SubSection.MATH_MULTIPLE_CHOICE]: "Math Multiple Choice",
  [SubSection.READING_COMPREHENSION]: "Reading Comprehension",
  [SubSection.REVISING_EDITING]: "Revising/ Editing",
};

export const SUB_SECTION_CHOICE_MAP: {
  [key in QuestionType]?: {
    [key in Section]?: SubSection[];
  };
} = {
  [QuestionType.FILL_IN_IMAGE]: {
    [Section.MATH]: [SubSection.MATH_FILL_IN],
  },
  [QuestionType.MULTIPLE_CHOICE_IMAGE]: {
    [Section.ENGLISH]: [
      SubSection.READING_COMPREHENSION,
      SubSection.REVISING_EDITING,
    ],
    [Section.MATH]: [SubSection.MATH_MULTIPLE_CHOICE],
  },
};
