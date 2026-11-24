import type { Question } from "./types";

export interface ParseResult {
  questions: Omit<Question, "id">[];
  errors: string[];
}

export const QUESTION_FILE_EXAMPLE = `[
  {
    "question": "대한민국의 수도는?",
    "options": ["부산", "서울", "인천", "대전"],
    "answer": "서울",
    "explanation": "대한민국의 수도는 서울특별시입니다."
  },
  {
    "question": "다음 중 과일인 것은? (복수 정답 가능)",
    "options": ["사과", "당근", "바나나", "오이"],
    "answers": ["사과", "바나나"],
    "explanation": "사과와 바나나는 과일, 당근과 오이는 채소입니다."
  }
]`;

export function parseQuestionsJson(text: string): ParseResult {
  const errors: string[] = [];
  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    return { questions: [], errors: ["JSON 형식이 올바르지 않습니다."] };
  }

  if (!Array.isArray(data)) {
    return { questions: [], errors: ["파일의 최상위는 배열([...]) 이어야 합니다."] };
  }

  const questions: Omit<Question, "id">[] = [];

  data.forEach((item, index) => {
    const label = `${index + 1}번째 문제`;
    if (typeof item !== "object" || item === null) {
      errors.push(`${label}: 올바른 형식의 객체가 아닙니다.`);
      return;
    }

    const obj = item as Record<string, unknown>;
    const question = typeof obj.question === "string" ? obj.question.trim() : "";
    const options = Array.isArray(obj.options)
      ? obj.options
          .filter((opt): opt is string => typeof opt === "string")
          .map((opt) => opt.trim())
          .filter((opt) => opt.length > 0)
      : [];
    const explanation = typeof obj.explanation === "string" ? obj.explanation.trim() : "";

    if (!question) {
      errors.push(`${label}: question 값이 비어 있습니다.`);
      return;
    }
    if (options.length < 2) {
      errors.push(`${label}: options는 2개 이상이어야 합니다.`);
      return;
    }

    let answerIndexes: number[] = [];
    if (Array.isArray(obj.answerIndexes)) {
      answerIndexes = obj.answerIndexes.filter(
        (n): n is number => typeof n === "number" && Number.isInteger(n)
      );
    } else if (Array.isArray(obj.answers)) {
      answerIndexes = obj.answers
        .filter((a): a is string => typeof a === "string")
        .map((a) => options.indexOf(a.trim()))
        .filter((idx) => idx >= 0);
    } else if (typeof obj.answerIndex === "number" && Number.isInteger(obj.answerIndex)) {
      answerIndexes = [obj.answerIndex];
    } else if (typeof obj.answer === "string") {
      const idx = options.indexOf(obj.answer.trim());
      if (idx >= 0) answerIndexes = [idx];
    }

    answerIndexes = [...new Set(answerIndexes)].filter(
      (idx) => idx >= 0 && idx < options.length
    );

    if (answerIndexes.length === 0) {
      errors.push(
        `${label}: answer/answers(정답 보기 텍스트) 또는 answerIndex/answerIndexes가 options와 일치하지 않습니다.`
      );
      return;
    }

    questions.push({
      question,
      options,
      answerIndexes,
      explanation: explanation || "해설이 제공되지 않았습니다.",
    });
  });

  return { questions, errors };

}
