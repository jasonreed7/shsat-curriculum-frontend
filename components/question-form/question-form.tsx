"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QuestionType,
  Section,
  SubSection,
} from "@/constants/question-constants";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  SECTION_CHOICE_LABELS,
  SECTION_CHOICE_MAP,
  SUB_SECTION_CHOICE_LABELS,
  SUB_SECTION_CHOICE_MAP,
} from "./constants";
import { QuestionFormSchema } from "./validation-schema";

interface QuestionFormProps {
  officialTests: OfficialTest[];
}

function getSectionChoices(questionType: QuestionType): Section[] {
  if (questionType && SECTION_CHOICE_MAP[questionType]) {
    return SECTION_CHOICE_MAP[questionType]!;
  }
  return [];
}

function getSubSectionChoices(
  questionType: QuestionType,
  section: Section
): SubSection[] {
  if (
    questionType &&
    section &&
    SUB_SECTION_CHOICE_MAP[questionType] &&
    SUB_SECTION_CHOICE_MAP[questionType]![section]
  ) {
    return SUB_SECTION_CHOICE_MAP[questionType]![section]!;
  }
  return [];
}

export default function QuestionForm({ officialTests }: QuestionFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      officialTestId: "1",
      officialTestQuestionNumber: 1,
      qType: QuestionType.FILL_IN_IMAGE,
      section: Section.MATH,
      subSection: SubSection.MATH_FILL_IN,
      passageId: 0,
      answer: 0,
    },
  });

  const setValue = form.setValue;

  const questionType = useWatch({
    control: form.control,
    name: "qType",
  });

  const section = useWatch({
    control: form.control,
    name: "section",
  });

  const subSection = useWatch({
    control: form.control,
    name: "subSection",
  });

  const questionImages = useWatch({
    control: form.control,
    name: "questionImages",
  });

  useEffect(() => {
    if (questionType === QuestionType.FILL_IN_IMAGE) {
      setValue("section", Section.MATH);
      setValue("subSection", SubSection.MATH_FILL_IN);
    } else if (section === Section.MATH) {
      setValue("subSection", SubSection.MATH_MULTIPLE_CHOICE);
    }
  }, [questionType]);

  useEffect(() => {
    if (section === Section.ENGLISH) {
      setValue("subSection", SubSection.READING_COMPREHENSION);
    } else if (questionType === QuestionType.MULTIPLE_CHOICE_IMAGE) {
      setValue("subSection", SubSection.MATH_MULTIPLE_CHOICE);
    } else {
      setValue("subSection", SubSection.MATH_FILL_IN);
    }
  }, [section]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionFormSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="officialTestId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Official Test</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an official test" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {officialTests.map((officialTest, index) => (
                    <SelectItem value={officialTest.id.toString()} key={index}>
                      {officialTest.year} Form {officialTest.form}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The official test.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="officialTestQuestionNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Official Question Number</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.001" />
              </FormControl>
              <FormDescription>
                Question number from the official test.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an question type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={QuestionType.FILL_IN_IMAGE}>
                    Fill-In Image
                  </SelectItem>
                  <SelectItem value={QuestionType.MULTIPLE_CHOICE_IMAGE}>
                    Multiple Choice Image
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The question type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a test section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getSectionChoices(questionType).map(
                    (sectionChoice, index) => (
                      <SelectItem value={sectionChoice} key={index}>
                        {SECTION_CHOICE_LABELS[sectionChoice]}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormDescription>The test section.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subSection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-section</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a test sub-section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getSubSectionChoices(questionType, section).map(
                    (subSectionChoice, index) => (
                      <SelectItem value={subSectionChoice} key={index}>
                        {SUB_SECTION_CHOICE_LABELS[subSectionChoice]}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormDescription>The test sub-section.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {questionType === QuestionType.FILL_IN_IMAGE && (
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>Fill-in answer.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="questionImages"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Question Image Files</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  // see https://github.com/react-hook-form/react-hook-form/issues/127#issuecomment-963884695
                  onChange={(event) => {
                    onChange(event.target.files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answerImages"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Answer Image Files</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => {
                    onChange(e.target.files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
