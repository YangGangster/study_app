import { useRef, useState } from "react";
import type { InProgressQuiz } from "../types";
import type { Theme } from "../storage";

interface HomeProps {
  setCount: number;
  notesCount: number;
  theme: Theme;
  onToggleTheme: () => void;
  resumeQuiz: InProgressQuiz | null;
  onResume: () => void;
  onDiscardResume: () => void;
  onOpenSets: () => void;
  onOpenNotes: () => void;
  onSearch: (query: string) => void;
  onOpenStats: () => void;
  onExportData: () => void;
  onImportData: (file: File) => void;
}

function Home({
  setCount,
  notesCount,
  theme,
  onToggleTheme,
  resumeQuiz,
  onResume,
  onDiscardResume,
  onOpenSets,
  onOpenNotes,
  onSearch,
  onOpenStats,
  onExportData,
  onImportData,
}: HomeProps) {
  const importInputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
  };

  return (
    <div className="screen home">
      <div className="home-top-row">
        <span className="eyebrow">✦ Study Lab</span>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="다크모드 전환">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
      <h1>📚 공부 퀴즈 앱</h1>
      <p className="subtitle">문제를 풀고, 정답을 확인하고, 해설로 복습하세요.</p>

      <form className="home-search-form" onSubmit={handleSearchSubmit}>
        <span className="home-search-icon">🔍</span>
        <input
          type="text"
          className="home-search-input"
          placeholder="문제집과 정리 자료 검색하기"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>

      {resumeQuiz && (
        <div className="resume-banner">
          <div className="resume-info">
            <p className="resume-title">▶ {resumeQuiz.label} 이어풀기</p>
            <p className="resume-sub">
              {resumeQuiz.currentIndex + 1} / {resumeQuiz.questions.length}번 문제까지 풀었어요
            </p>
          </div>
          <div className="resume-actions">
            <button className="primary" onClick={onResume}>
              이어풀기
            </button>
            <button className="link-button" onClick={onDiscardResume}>
              그만두기
            </button>
          </div>
        </div>
      )}

      <section className="card card--blue">
        <div className="card-heading">
          <span className="icon-badge">📚</span>
          <div className="card-heading-text">
            <span className="card-kicker">Question Sets</span>
            <h2>문제집</h2>
          </div>
        </div>
        <p>{setCount}개의 문제집</p>
        <button className="primary" onClick={onOpenSets}>
          보기
        </button>
      </section>

      <section className="card card--teal">
        <div className="card-heading">
          <span className="icon-badge">📝</span>
          <div className="card-heading-text">
            <span className="card-kicker">Study Notes</span>
            <h2>정리 자료</h2>
          </div>
        </div>
        <p>{notesCount}개의 노트</p>
        <button className="primary" onClick={onOpenNotes}>
          보기
        </button>
      </section>

      <section className="card card--amber">
        <div className="card-heading">
          <span className="icon-badge">📊</span>
          <div className="card-heading-text">
            <span className="card-kicker">Stats</span>
            <h2>통계/기록</h2>
          </div>
        </div>
        <p>지금까지 푼 퀴즈 기록을 확인해요.</p>
        <button className="primary" onClick={onOpenStats}>
          보기
        </button>
      </section>

      <div className="backup-bar">
        <button className="secondary" onClick={onExportData}>
          📤 내보내기
        </button>
        <button className="secondary" onClick={() => importInputRef.current?.click()}>
          📥 가져오기
        </button>
        <input
          ref={importInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden-file-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImportData(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

export default Home;


