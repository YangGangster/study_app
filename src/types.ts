export interface Question {
  id: string;
  question: string;
  options: string[];
  answerIndexes: number[];
  explanation: string;
}

export interface QuestionAnswer {
  selectedIndexes: number[];
  checked: boolean;
}

export interface QuestionSet {
  id: string;
  title: string;
  questions: Question[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface HistoryEntry {
  id: string;
  label: string;
  total: number;
  correctCount: number;
  scorePercent: number;
  isPass: boolean;
  timestamp: number;
}

export interface InProgressQuiz {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, QuestionAnswer>;
  timeLimitSeconds: number | null;
  remainingSeconds: number | null;
  label: string;
  savedAt: number;
}



