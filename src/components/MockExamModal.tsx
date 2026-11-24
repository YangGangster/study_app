import { useMemo, useState } from "react";
import type { QuestionSet } from "../types";
import { shuffleArray } from "../quizUtils";

interface MockExamModalProps {
  builtInSets: QuestionSet[];
  customSets: QuestionSet[];
  onCancel: () => void;
  onStart: (questions: QuestionSet["questions"], timeLimitSeconds: number | null) => void;
}

type TimeOption = "none" | "1200" | "1800" | "2700";

function MockExamModal({ builtInSets, customSets, onCancel, onStart }: MockExamModalProps) {
  const allSets = useMemo(() => [...builtInSets, ...customSets], [builtInSets, customSets]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(allSets.map((s) => s.id))
  );
  const [count, setCount] = useState(25);
  const [timeOption, setTimeOption] = useState<TimeOption>("1800");

  const pool = useMemo(
    () => allSets.filter((s) => selectedIds.has(s.id)).flatMap((s) => s.questions),
    [allSets, selectedIds]
  );

  const toggleSet = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleStart = () => {
    const shuffled = shuffleArray(pool);
    const timeLimitSeconds = timeOption === "none" ? null : Number(timeOption);
    onStart(shuffled.slice(0, Math.min(count, pool.length)), timeLimitSeconds);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>🎯 모의고사 만들기</h2>

        <div className="modal-section">
          <p className="modal-label">문제집 선택 (총 {pool.length}문제 풀)</p>
          <div className="modal-options">
            {allSets.map((set) => (
              <label key={set.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.has(set.id)}
                  onChange={() => toggleSet(set.id)}
                />
                {set.title} ({set.questions.length}문제)
              </label>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <p className="modal-label">문제 수</p>
          <input
            type="number"
            className="modal-number-input"
            min={1}
            max={Math.max(pool.length, 1)}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>

        <div className="modal-section">
          <p className="modal-label">시간 제한</p>
          <div className="modal-options">
            <label>
              <input
                type="radio"
                checked={timeOption === "none"}
                onChange={() => setTimeOption("none")}
              />
              제한 없음
            </label>
            <label>
              <input
                type="radio"
                checked={timeOption === "1200"}
                onChange={() => setTimeOption("1200")}
              />
              20분
            </label>
            <label>
              <input
                type="radio"
                checked={timeOption === "1800"}
                onChange={() => setTimeOption("1800")}
              />
              30분
            </label>
            <label>
              <input
                type="radio"
                checked={timeOption === "2700"}
                onChange={() => setTimeOption("2700")}
              />
              45분
            </label>
          </div>
        </div>

        <div className="button-row">
          <button className="secondary" onClick={onCancel}>
            취소
          </button>
          <button className="primary" onClick={handleStart} disabled={pool.length === 0}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MockExamModal;
