import type { QuestionSet } from "../types";
import { jsmSet1Questions } from "./jsmSet1";
import { jsmSet2Questions } from "./jsmSet2";

// 실제 시험 1회분 기준(25문제)에 맞춰 보유한 75문제를 25문제씩 3세트로 재분배
const allJsmQuestions = [...jsmSet1Questions, ...jsmSet2Questions];

export const sampleQuestionSets: QuestionSet[] = [
  { id: "jsm-1", title: "JSM 1", questions: allJsmQuestions.slice(0, 25) },
  { id: "jsm-2", title: "JSM 2", questions: allJsmQuestions.slice(25, 50) },
  { id: "jsm-3", title: "JSM 3", questions: allJsmQuestions.slice(50, 75) },
];



