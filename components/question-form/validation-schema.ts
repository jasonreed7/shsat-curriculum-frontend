"use client";

import {
  QuestionType,
  Section,
  SubSection,
} from "@/constants/question-constants";
import { z } from "zod";

const QuestionBaseSchema = z.object({
  officialTestId: z.string(),
  officialTestQuestionNumber: z.number().int().positive(),
  qType: z.nativeEnum(QuestionType),
  section: z.nativeEnum(Section),
  subSection: z.nativeEnum(SubSection),
  passageId: z.optional(z.number().int()),
});

const ImageQuestionSchema = QuestionBaseSchema.extend({
  // see https://github.com/react-hook-form/react-hook-form/issues/127#issuecomment-963884695
  questionImages: z
    .instanceof(FileList)
    .refine((val) => val.length > 0, "At least one file is required"),
  answerImages: z
    .instanceof(FileList)
    .refine((val) => val.length > 0, "At least one file is required"),
});

const FillInQuestionSchema = QuestionBaseSchema.extend({
  // hack to try to control precision of grid-in answers
  answer: z.number().multipleOf(0.001),
});

const FillInImageQuestionSchema = FillInQuestionSchema.merge(
  ImageQuestionSchema
).extend({
  qType: z.literal(QuestionType.FILL_IN_IMAGE),
});

const MultipleChoiceImageQuestionSchema = ImageQuestionSchema.extend({
  qType: z.literal(QuestionType.MULTIPLE_CHOICE_IMAGE),
  answers: z.boolean().array().length(4),
});

export const QuestionFormSchema = z.discriminatedUnion("qType", [
  FillInImageQuestionSchema,
  MultipleChoiceImageQuestionSchema,
]);
