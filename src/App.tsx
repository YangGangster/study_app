import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import QuestionAdd from "./components/QuestionAdd";
import QuestionSets from "./components/QuestionSets";
import Result from "./components/Result";
import Notes from "./components/Notes";
import Search from "./components/Search";
import Stats from "./components/Stats";
import { sampleQuestionSets } from "./data/sampleQuestionSets";
import { isAnswerCorrect } from "./quizUtils";
import {
  addCustomSet,
  addHistoryEntry,
  addNotes,
  clearHistory,
  clearInProgressQuiz,
  exportAllData,
  getBookmarks,
  getCustomSets,
  getHistory,
  getInProgressQuiz,
  getNotes,
  getTheme,
  getWrongQuestions,
  importAllData,
  removeCustomSet,
  removeNote,
  setTheme as persistTheme,
  toggleBookmark,
  updateWrongQuestions,
  type Theme,
} from "./storage";
import type {
  HistoryEntry,
  InProgressQuiz,
  Note,
  Question,
  QuestionAnswer,
  QuestionSet,
} from "./types";

type View = "home" | "sets" | "quiz" | "add" | "result" | "notes" | "search" | "stats";

interface ResumeState {
  currentIndex: number;
  answers: Record<string, QuestionAnswer>;
  remainingSeconds: number | null;
}

function App() {
  const [view, setView] = useState<View>("home");
  const [customSets, setCustomSets] = useState<QuestionSet[]>(() => getCustomSets());
  const [notes, setNotes] = useState<Note[]>(() => getNotes());
  const [bookmarks, setBookmarks] = useState<Question[]>(() => getBookmarks());
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>(() => getWrongQuestions());
  const [history, setHistory] = useState<HistoryEntry[]>(() => getHistory());
  const [inProgress, setInProgress] = useState<InProgressQuiz | null>(() => getInProgressQuiz());
  const [theme, setThemeState] = useState<Theme>(() => getTheme());
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [activeTimeLimit, setActiveTimeLimit] = useState<number | null>(null);
  const [activeLabel, setActiveLabel] = useState("");
  const [resumeState, setResumeState] = useState<ResumeState | null>(null);
  const [finalAnswers, setFinalAnswers] = useState<Record<string, QuestionAnswer>>({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleStartQuiz = (
    questions: Question[],
    timeLimitSeconds: number | null,
    label: string
  ) => {
    setActiveQuestions(questions);
    setActiveTimeLimit(timeLimitSeconds);
    setActiveLabel(label);
    setResumeState(null);
    setView("quiz");
  };

  const handleResumeQuiz = () => {
    if (!inProgress) return;
    setActiveQuestions(inProgress.questions);
    setActiveTimeLimit(inProgress.timeLimitSeconds);
    setActiveLabel(inProgress.label);
    setResumeState({
      currentIndex: inProgress.currentIndex,
      answers: inProgress.answers,
      remainingSeconds: inProgress.remainingSeconds,
    });
    setView("quiz");
  };

  const handleDiscardProgress = () => {
    clearInProgressQuiz();
    setInProgress(null);
  };

  const handleExitQuiz = () => {
    setInProgress(getInProgressQuiz());
    setView("home");
  };

  const handleFinishQuiz = (answers: Record<string, QuestionAnswer>) => {
    const total = activeQuestions.length;
    const correctCount = activeQuestions.filter((q) =>
      isAnswerCorrect(answers[q.id]?.selectedIndexes ?? [], q.answerIndexes)
    ).length;
    const scorePercent = total === 0 ? 0 : Math.round((correctCount / total) * 100);
    const requiredCorrect = Math.ceil(total * (17 / 25));
    const isPass = correctCount >= requiredCorrect;

    setHistory(
      addHistoryEntry({
        label: activeLabel,
        total,
        correctCount,
        scorePercent,
        isPass,
        timestamp: Date.now(),
      })
    );
    setWrongQuestions(updateWrongQuestions(activeQuestions, answers));
    clearInProgressQuiz();
    setInProgress(null);
    setFinalAnswers(answers);
    setView("result");
  };

  const handleSaveSet = (title: string, questions: Omit<Question, "id">[]) => {
    const saved = addCustomSet(title, questions);
    setCustomSets((prev) => [...prev, saved]);
    setView("sets");
  };

  const handleDeleteCustomSet = (id: string) => {
    removeCustomSet(id);
    setCustomSets((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddNotes = (newNotes: Omit<Note, "id">[]) => {
    const saved = addNotes(newNotes);
    setNotes((prev) => [...prev, ...saved]);
  };

  const handleDeleteNote = (id: string) => {
    removeNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleToggleBookmark = (question: Question) => {
    setBookmarks(toggleBookmark(question));
  };

  const handleToggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    persistTheme(next);
    setThemeState(next);
  };

  const handleClearHistory = () => {
    setHistory(clearHistory());
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setView("search");
  };

  const handleExportData = () => {
    const json = exportAllData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `study-app-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = async (file: File) => {
    const confirmed = window.confirm(
      "가져오기를 진행하면 현재 저장된 문제집/노트/북마크/오답노트/기록이 백업 파일 내용으로 덮어써져요. 계속할까요?"
    );
    if (!confirmed) return;

    const text = await file.text();
    const result = importAllData(text);
    if (!result.success) {
      window.alert(result.error ?? "가져오기에 실패했어요.");
      return;
    }

    setCustomSets(getCustomSets());
    setNotes(getNotes());
    setBookmarks(getBookmarks());
    setWrongQuestions(getWrongQuestions());
    setHistory(getHistory());
    window.alert("가져오기를 완료했어요.");
  };

  return (
    <div className="app">
      {view === "home" && (
        <Home
          setCount={sampleQuestionSets.length + customSets.length}
          notesCount={notes.length}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          resumeQuiz={inProgress}
          onResume={handleResumeQuiz}
          onDiscardResume={handleDiscardProgress}
          onOpenSets={() => setView("sets")}
          onOpenNotes={() => setView("notes")}
          onSearch={handleSearch}
          onOpenStats={() => setView("stats")}
          onExportData={handleExportData}
          onImportData={handleImportData}
        />
      )}

      {view === "sets" && (
        <QuestionSets
          builtInSets={sampleQuestionSets}
          customSets={customSets}
          bookmarkedQuestions={bookmarks}
          wrongQuestions={wrongQuestions}
          onStart={handleStartQuiz}
          onAdd={() => setView("add")}
          onDeleteCustom={handleDeleteCustomSet}
          onExit={() => setView("home")}
        />
      )}

      {view === "quiz" && (
        <Quiz
          questions={activeQuestions}
          timeLimitSeconds={activeTimeLimit}
          label={activeLabel}
          resumeState={resumeState}
          bookmarkedIds={new Set(bookmarks.map((q) => q.id))}
          onToggleBookmark={handleToggleBookmark}
          onFinish={handleFinishQuiz}
          onExit={handleExitQuiz}
        />
      )}

      {view === "add" && (
        <QuestionAdd onSave={handleSaveSet} onCancel={() => setView("sets")} />
      )}

      {view === "result" && (
        <Result
          questions={activeQuestions}
          answers={finalAnswers}
          onRestart={() => setView("quiz")}
          onHome={() => setView("home")}
        />
      )}

      {view === "notes" && (
        <Notes
          notes={notes}
          onAdd={handleAddNotes}
          onDelete={handleDeleteNote}
          onExit={() => setView("home")}
        />
      )}

      {view === "search" && (
        <Search
          notes={notes}
          builtInSets={sampleQuestionSets}
          customSets={customSets}
          initialQuery={searchQuery}
          onStartQuiz={(questions) => handleStartQuiz(questions, null, "검색 결과")}
          onExit={() => setView("home")}
        />
      )}

      {view === "stats" && (
        <Stats history={history} onClearHistory={handleClearHistory} onExit={() => setView("home")} />
      )}
    </div>
  );
}

export default App;



