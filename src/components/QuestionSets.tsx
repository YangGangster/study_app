import { useState } from "react";
import type { Question, QuestionSet } from "../types";
import { shuffleArray } from "../quizUtils";
import QuizStartModal from "./QuizStartModal";
import MockExamModal from "./MockExamModal";

interface QuestionSetsProps {
  builtInSets: QuestionSet[];
  customSets: QuestionSet[];
  bookmarkedQuestions: Question[];
  wrongQuestions: Question[];
  onStart: (questions: Question[], timeLimitSeconds: number | null, label: string) => void;
  onAdd: () => void;
  onDeleteCustom: (id: string) => void;
  onExit: () => void;
}

function QuestionSets({
  builtInSets,
  customSets,
  bookmarkedQuestions,
  wrongQuestions,
  onStart,
  onAdd,
  onDeleteCustom,
  onExit,
}: QuestionSetsProps) {
  const [pending, setPending] = useState<{ questions: Question[]; label: string } | null>(null);
  const [showMockExam, setShowMockExam] = useState(false);

  const handleConfirmStart = ({
    count,
    shuffle,
    timeLimitSeconds,
  }: {
    count: number;
    shuffle: boolean;
    timeLimitSeconds: number | null;
  }) => {
    if (!pending) return;
    const base = shuffle ? shuffleArray(pending.questions) : pending.questions;
    onStart(base.slice(0, count), timeLimitSeconds, pending.label);
    setPending(null);
  };

  const handleStartMockExam = (questions: Question[], timeLimitSeconds: number | null) => {
    onStart(questions, timeLimitSeconds, "모의고사");
    setShowMockExam(false);
  };

  return (
    <div className="screen sets">
      <div className="quiz-header">
        <button className="link-button" onClick={onExit}>
          ← 홈으로
        </button>
      </div>
      <span className="eyebrow">✦ Question Sets</span>
      <h1>문제집</h1>
      <p className="subtitle">풀고 싶은 문제집을 골라주세요.</p>

      <ul className="set-list">
        <li className="set-item set-item--special">
          <div className="set-item-info">
            <span className="set-item-title">🎯 모의고사 만들기</span>
            <span className="set-item-count">원하는 문제집을 골라 랜덤 모의고사를 풀어요</span>
          </div>
          <button className="primary" onClick={() => setShowMockExam(true)}>
            만들기
          </button>
        </li>
        <li className="set-item set-item--special">
          <div className="set-item-info">
            <span className="set-item-title">⭐ 북마크한 문제</span>
            <span className="set-item-count">{bookmarkedQuestions.length}문제</span>
          </div>
          <button
            className="primary"
            onClick={() => setPending({ questions: bookmarkedQuestions, label: "북마크한 문제" })}
            disabled={bookmarkedQuestions.length === 0}
          >
            풀기
          </button>
        </li>
        <li className="set-item set-item--special">
          <div className="set-item-info">
            <span className="set-item-title">❌ 오답노트</span>
            <span className="set-item-count">{wrongQuestions.length}문제</span>
          </div>
          <button
            className="primary"
            onClick={() => setPending({ questions: wrongQuestions, label: "오답노트" })}
            disabled={wrongQuestions.length === 0}
          >
            풀기
          </button>
        </li>
      </ul>

      <p className="set-group-label">기본 제공 문제집</p>
      <ul className="set-list">
        {builtInSets.map((set) => (
          <li key={set.id} className="set-item">
            <div className="set-item-info">
              <span className="set-item-title">{set.title}</span>
              <span className="set-item-count">{set.questions.length}문제</span>
            </div>
            <button
              className="primary"
              onClick={() => setPending({ questions: set.questions, label: set.title })}
              disabled={set.questions.length === 0}
            >
              풀기
            </button>
          </li>
        ))}
      </ul>

      <p className="set-group-label">내가 추가한 문제집</p>
      {customSets.length === 0 ? (
        <p className="hint">아직 추가한 문제집이 없어요. 아래 버튼으로 새 문제집을 만들어보세요.</p>
      ) : (
        <ul className="set-list">
          {customSets.map((set) => (
            <li key={set.id} className="set-item">
              <div className="set-item-info">
                <span className="set-item-title">{set.title}</span>
                <span className="set-item-count">{set.questions.length}문제</span>
              </div>
              <div className="set-item-actions">
                <button
                  className="primary"
                  onClick={() => setPending({ questions: set.questions, label: set.title })}
                  disabled={set.questions.length === 0}
                >
                  풀기
                </button>
                <button className="link-button" onClick={() => onDeleteCustom(set.id)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button className="secondary full-width" onClick={onAdd}>
        + 새 문제집 추가하기
      </button>

      {pending && (
        <QuizStartModal
          totalCount={pending.questions.length}
          onCancel={() => setPending(null)}
          onStart={handleConfirmStart}
        />
      )}

      {showMockExam && (
        <MockExamModal
          builtInSets={builtInSets}
          customSets={customSets}
          onCancel={() => setShowMockExam(false)}
          onStart={handleStartMockExam}
        />
      )}
    </div>
  );
}

export default QuestionSets;


