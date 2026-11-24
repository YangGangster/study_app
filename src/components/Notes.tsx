import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Note } from "../types";

interface NotesProps {
  notes: Note[];
  onAdd: (notes: Omit<Note, "id">[]) => void;
  onDelete: (id: string) => void;
  onExit: () => void;
}

function Notes({ notes, onAdd, onDelete, onExit }: NotesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;
  // 제목으로 이미 뽑아낸 첫 "# 제목" 줄은 본문에서 중복 표시하지 않음
  const selectedNoteBody = selectedNote
    ? selectedNote.content.replace(/^#\s+.+\r?\n?/, "")
    : "";

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList).filter((f) =>
      f.name.toLowerCase().endsWith(".md")
    );
    if (files.length === 0) {
      setError("마크다운(.md) 파일만 추가할 수 있어요.");
      return;
    }

    const newNotes: Omit<Note, "id">[] = [];
    for (const file of files) {
      const content = await file.text();
      const titleFromHeading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
      const titleFromFilename = file.name.replace(/\.md$/i, "");
      newNotes.push({ title: titleFromHeading || titleFromFilename, content });
    }

    setError("");
    onAdd(newNotes);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (selectedNote) {
    return (
      <div className="screen notes">
        <div className="quiz-header">
          <button className="link-button" onClick={() => setSelectedId(null)}>
            ← 목록으로
          </button>
        </div>
        <h1>{selectedNote.title}</h1>
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {selectedNoteBody}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className="screen notes">
      <div className="quiz-header">
        <button className="link-button" onClick={onExit}>
          ← 홈으로
        </button>
      </div>
      <span className="eyebrow">✦ Study Notes</span>
      <h1>정리 자료</h1>
      <p className="subtitle">.md 파일을 올리면 바로 정리 노트로 볼 수 있어요.</p>

      <label className="file-drop">
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,text/markdown"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span>+ .md 파일 추가하기 (여러 개 선택 가능)</span>
      </label>
      {error && <p className="error">{error}</p>}

      {notes.length === 0 ? (
        <p className="hint">아직 추가한 정리 자료가 없어요.</p>
      ) : (
        <ul className="note-list">
          {notes.map((note) => (
            <li key={note.id}>
              <button
                className="note-title"
                onClick={() => setSelectedId(note.id)}
              >
                📄 {note.title}
              </button>
              <button
                className="link-button"
                onClick={() => onDelete(note.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notes;
