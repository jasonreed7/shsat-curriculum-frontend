import QuestionForm from "@/components/question-form/question-form";

export default async function CreateQuestionPage() {
  const res = await fetch(`${process.env.API_BASE_URL}/officialTests`, {
    cache: "no-cache",
  });

  const officialTests: OfficialTest[] = await res.json();

  return <QuestionForm officialTests={officialTests} />;
}
