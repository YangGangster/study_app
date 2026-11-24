import { useEffect, useRef, useState } from "react";
import type { Question, QuestionAnswer } from "../types";
import { isAnswerCorrect } from "../quizUtils";
import { saveInProgressQuiz } from "../storage";

interface QuizProps {
  questions: Question[];
  timeLimitSeconds?: number | null;
  label: string;
  resumeState?: {
    currentIndex: number;
    answers: Record<string, QuestionAnswer>;
    remainingSeconds: number | null;
  } | null;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (question: Question) => void;
  onFinish: (answers: Record<string, QuestionAnswer>) => void;
  onExit: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Quiz({
  questions,
  timeLimitSeconds,
  label,
  resumeState,
  bookmarkedIds,
  onToggleBookmark,
  onFinish,
  onExit,
}: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(resumeState?.currentIndex ?? 0);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>(
    resumeState?.answers ?? {}
  );
  const [remainingSeconds, setRemainingSeconds] = useState(
    resumeState?.remainingSeconds ?? timeLimitSeconds ?? null
  );
  const answersRef = useRef(answers);
  answersRef.current = answers;

  useEffect(() => {
    if (remainingSeconds === null) return;
    if (remainingSeconds <= 0) {
      onFinish(answersRef.current);
      return;
    }
    const timer = setTimeout(() => setRemainingSeconds((s) => (s ?? 0) - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds]);

  // 진행 상황을 계속 저장해 중간에 나가도 이어풀기가 가능하도록 함
  useEffect(() => {
    saveInProgressQuiz({
      questions,
      currentIndex,
      answers,
      timeLimitSeconds: timeLimitSeconds ?? null,
      remainingSeconds,
      label,
      savedAt: Date.now(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, answers, remainingSeconds]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer: QuestionAnswer = answers[currentQuestion.id] ?? {
    selectedIndexes: [],
    checked: false,
  };
  const isLastQuestion = currentIndex === questions.length - 1;
  const isMulti = currentQuestion.answerIndexes.length > 1;
  const isBookmarked = bookmarkedIds.has(currentQuestion.id);

  const handleSelectOption = (index: number) => {
    if (currentAnswer.checked) return;
    setAnswers((prev) => {
      let selectedIndexes: number[];
      if (isMulti) {
        selectedIndexes = currentAnswer.selectedIndexes.includes(index)
          ? currentAnswer.selectedIndexes.filter((i) => i !== index)
          : [...currentAnswer.selectedIndexes, index];
      } else {
        selectedIndexes = [index];
      }
      return {
        ...prev,
        [currentQuestion.id]: { selectedIndexes, checked: false },
      };
    });
  };

  const handleCheckAnswer = () => {
    if (currentAnswer.selectedIndexes.length === 0) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { ...currentAnswer, checked: true },
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onFinish(answers);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const getOptionClassName = (index: number) => {
    const classes = ["option"];
    if (isMulti) classes.push("option--multi");
    if (!currentAnswer.checked) {
      if (currentAnswer.selectedIndexes.includes(index)) classes.push("selected");
      return classes.join(" ");
    }
    if (currentQuestion.answerIndexes.includes(index)) {
      classes.push("correct");
    } else if (currentAnswer.selectedIndexes.includes(index)) {
      classes.push("incorrect");
    }
    return classes.join(" ");
  };

  const getOptionMarker = (index: number) => {
    const isSelected = currentAnswer.selectedIndexes.includes(index);
    if (isMulti) return isSelected ? "☑" : "☐";
    return isSelected ? "●" : "○";
  };

  const isCorrect =
    currentAnswer.checked &&
    isAnswerCorrect(currentAnswer.selectedIndexes, currentQuestion.answerIndexes);

  const correctOptionsText = currentQuestion.answerIndexes
    .map((i) => currentQuestion.options[i])
    .join(", ");

  return (
    <div className="screen quiz">
      <div className="quiz-header">
        <button className="link-button" onClick={onExit}>
          ← 홈으로
        </button>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="progress">
          Q{currentIndex + 1} / {questions.length}
        </span>
        {remainingSeconds !== null && (
          <span className={`timer ${remainingSeconds <= 30 ? "timer--warning" : ""}`}>
            ⏱ {formatTime(remainingSeconds)}
          </span>
        )}
      </div>

      <div className="question-meta-row">
        <span className="question-meta">
          Question {currentIndex + 1} of {questions.length}
          {isMulti && <span className="multi-tag">복수 정답</span>}
        </span>
        <button
          className={`bookmark-button ${isBookmarked ? "active" : ""}`}
          onClick={() => onToggleBookmark(currentQuestion)}
          aria-label="북마크"
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>
      <h2 className="question-text">{currentQuestion.question}</h2>

      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClassName(index)}
            onClick={() => handleSelectOption(index)}
            disabled={currentAnswer.checked}
          >
            <span className="option-marker">{getOptionMarker(index)}</span>
            {option}
          </button>
        ))}
      </div>

      {currentAnswer.checked && (
        <div className={`result-banner ${isCorrect ? "correct" : "incorrect"}`}>
          <p className="result-title">
            {isCorrect ? "정답입니다! 🎉" : "틀렸습니다."}
          </p>
          {!isCorrect && <p>정답: {correctOptionsText}</p>}
          <p className="explanation">해설: {currentQuestion.explanation}</p>
        </div>
      )}

      <div className="button-row">
        <button
          className="secondary"
          onClick={handleCheckAnswer}
          disabled={currentAnswer.selectedIndexes.length === 0 || currentAnswer.checked}
        >
          정답 보기
        </button>
        <button
          className="primary"
          onClick={handleNext}
          disabled={currentAnswer.selectedIndexes.length === 0}
        >
          {isLastQuestion ? "결과 보기" : "다음"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;


