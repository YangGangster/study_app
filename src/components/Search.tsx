import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Note, Question, QuestionSet } from "../types";

interface SearchProps {
  notes: Note[];
  builtInSets: QuestionSet[];
  customSets: QuestionSet[];
  initialQuery?: string;
  onStartQuiz: (questions: Question[]) => void;
  onExit: () => void;
}

interface QuestionMatch {
  question: Question;
  setTitle: string;
}

function Search({ notes, builtInSets, customSets, initialQuery, onStartQuiz, onExit }: SearchProps) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const noteMatches = useMemo(() => {
    if (!normalizedQuery) return [];
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(normalizedQuery) ||
        note.content.toLowerCase().includes(normalizedQuery)
    );
  }, [notes, normalizedQuery]);

  const questionMatches = useMemo<QuestionMatch[]>(() => {
    if (!normalizedQuery) return [];
    const allSets = [...builtInSets, ...customSets];
    const matches: QuestionMatch[] = [];
    for (const set of allSets) {
      for (const question of set.questions) {
        const haystack = `${question.question} ${question.options.join(" ")}`.toLowerCase();
        if (haystack.includes(normalizedQuery)) {
          matches.push({ question, setTitle: set.title });
        }
      }
    }
    return matches;
  }, [builtInSets, customSets, normalizedQuery]);

  if (selectedNote) {
    const body = selectedNote.content.replace(/^#\s+.+\r?\n?/, "");
    return (
      <div className="screen notes">
        <div className="quiz-header">
          <button className="link-button" onClick={() => setSelectedNote(null)}>
            ← 검색 결과로
          </button>
        </div>
        <h1>{selectedNote.title}</h1>
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="quiz-header">
        <button className="link-button" onClick={onExit}>
          ← 홈으로
        </button>
      </div>
      <span className="eyebrow">✦ Search</span>
      <h1>검색</h1>
      <p className="subtitle">정리 자료와 문제를 한 번에 검색해요.</p>

      <input
        type="text"
        className="search-input"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      {normalizedQuery && (
        <>
          <p className="set-group-label">노트 결과 ({noteMatches.length})</p>
          {noteMatches.length === 0 ? (
            <p className="hint">일치하는 노트가 없어요.</p>
          ) : (
            <ul className="note-list">
              {noteMatches.map((note) => (
                <li key={note.id}>
                  <button className="note-title" onClick={() => setSelectedNote(note)}>
                    📄 {note.title}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p className="set-group-label">문제 결과 ({questionMatches.length})</p>
          {questionMatches.length === 0 ? (
            <p className="hint">일치하는 문제가 없어요.</p>
          ) : (
            <>
              <button
                className="primary full-width"
                onClick={() => onStartQuiz(questionMatches.map((m) => m.question))}
              >
                검색된 {questionMatches.length}문제 풀기
              </button>
              <ul className="preview-list">
                {questionMatches.map((match) => (
                  <li key={match.question.id}>
                    [{match.setTitle}] {match.question.question}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
