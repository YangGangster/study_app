import type { HistoryEntry, InProgressQuiz, Note, Question, QuestionAnswer, QuestionSet } from "./types";
import { isAnswerCorrect } from "./quizUtils";

const SETS_KEY = "study-app:custom-sets";
const NOTES_KEY = "study-app:notes";
const WRONG_KEY = "study-app:wrong-questions";
const BOOKMARKS_KEY = "study-app:bookmarks";
const HISTORY_KEY = "study-app:history";
const IN_PROGRESS_KEY = "study-app:in-progress-quiz";
const THEME_KEY = "study-app:theme";
const MAX_HISTORY_ENTRIES = 200;

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getCustomSets(): QuestionSet[] {
  try {
    const raw = localStorage.getItem(SETS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCustomSets(sets: QuestionSet[]) {
  localStorage.setItem(SETS_KEY, JSON.stringify(sets));
}

export function addCustomSet(
  title: string,
  questions: Omit<Question, "id">[]
): QuestionSet {
  const newSet: QuestionSet = {
    id: makeId("set"),
    title,
    questions: questions.map((q) => ({ ...q, id: makeId("q") })),
  };
  const sets = getCustomSets();
  sets.push(newSet);
  saveCustomSets(sets);
  return newSet;
}

export function removeCustomSet(id: string) {
  const sets = getCustomSets().filter((s) => s.id !== id);
  saveCustomSets(sets);
}

export function getNotes(): Note[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function addNotes(notes: Omit<Note, "id">[]): Note[] {
  const newNotes: Note[] = notes.map((n) => ({ ...n, id: makeId("note") }));
  const existing = getNotes();
  saveNotes([...existing, ...newNotes]);
  return newNotes;
}

export function removeNote(id: string) {
  const notes = getNotes().filter((n) => n.id !== id);
  saveNotes(notes);
}

export function getWrongQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(WRONG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveWrongQuestions(questions: Question[]) {
  localStorage.setItem(WRONG_KEY, JSON.stringify(questions));
}

// 퀴즈 종료 후 호출: 틀린 문제는 오답노트에 추가하고, 맞힌 문제는 오답노트에서 제거(복습 완료 처리)
export function updateWrongQuestions(
  questions: Question[],
  answers: Record<string, QuestionAnswer>
): Question[] {
  const existing = getWrongQuestions();
  const byId = new Map(existing.map((q) => [q.id, q]));

  for (const question of questions) {
    const selected = answers[question.id]?.selectedIndexes ?? [];
    const correct = isAnswerCorrect(selected, question.answerIndexes);
    if (correct) {
      byId.delete(question.id);
    } else {
      byId.set(question.id, question);
    }
  }

  const updated = [...byId.values()];
  saveWrongQuestions(updated);
  return updated;
}

export function getBookmarks(): Question[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveBookmarks(questions: Question[]) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(questions));
}

export function toggleBookmark(question: Question): Question[] {
  const existing = getBookmarks();
  const isBookmarked = existing.some((q) => q.id === question.id);
  const updated = isBookmarked
    ? existing.filter((q) => q.id !== question.id)
    : [...existing, question];
  saveBookmarks(updated);
  return updated;
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
}

export function addHistoryEntry(entry: Omit<HistoryEntry, "id">): HistoryEntry[] {
  const newEntry: HistoryEntry = { ...entry, id: makeId("history") };
  const updated = [newEntry, ...getHistory()].slice(0, MAX_HISTORY_ENTRIES);
  saveHistory(updated);
  return updated;
}

export function clearHistory(): HistoryEntry[] {
  saveHistory([]);
  return [];
}

export function getInProgressQuiz(): InProgressQuiz | null {
  try {
    const raw = localStorage.getItem(IN_PROGRESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveInProgressQuiz(data: InProgressQuiz) {
  localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify(data));
}

export function clearInProgressQuiz() {
  localStorage.removeItem(IN_PROGRESS_KEY);
}

export type Theme = "light" | "dark";

export function getTheme(): Theme {
  return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
}

interface BackupData {
  customSets: QuestionSet[];
  notes: Note[];
  wrongQuestions: Question[];
  bookmarks: Question[];
  history: HistoryEntry[];
}

export function exportAllData(): string {
  const data: BackupData = {
    customSets: getCustomSets(),
    notes: getNotes(),
    wrongQuestions: getWrongQuestions(),
    bookmarks: getBookmarks(),
    history: getHistory(),
  };
  return JSON.stringify(data, null, 2);
}

export function importAllData(json: string): { success: boolean; error?: string } {
  let data: Partial<BackupData>;
  try {
    data = JSON.parse(json);
  } catch {
    return { success: false, error: "JSON 형식이 올바르지 않습니다." };
  }

  if (typeof data !== "object" || data === null) {
    return { success: false, error: "백업 파일 형식이 올바르지 않습니다." };
  }

  if (Array.isArray(data.customSets)) saveCustomSets(data.customSets);
  if (Array.isArray(data.notes)) saveNotes(data.notes);
  if (Array.isArray(data.wrongQuestions)) saveWrongQuestions(data.wrongQuestions);
  if (Array.isArray(data.bookmarks)) saveBookmarks(data.bookmarks);
  if (Array.isArray(data.history)) saveHistory(data.history);

  return { success: true };
}


