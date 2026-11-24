import { useState } from "react";

interface QuizStartModalProps {
  totalCount: number;
  onCancel: () => void;
  onStart: (options: { count: number; shuffle: boolean; timeLimitSeconds: number | null }) => void;
}

type CountOption = "all" | "10" | "20" | "custom";
type TimeOption = "none" | "300" | "600" | "900";

function QuizStartModal({ totalCount, onCancel, onStart }: QuizStartModalProps) {
  const [countOption, setCountOption] = useState<CountOption>("all");
  const [customCount, setCustomCount] = useState(Math.min(10, totalCount));
  const [shuffle, setShuffle] = useState(false);
  const [timeOption, setTimeOption] = useState<TimeOption>("none");

  const handleStart = () => {
    let count = totalCount;
    if (countOption === "10") count = Math.min(10, totalCount);
    else if (countOption === "20") count = Math.min(20, totalCount);
    else if (countOption === "custom") {
      count = Math.max(1, Math.min(customCount, totalCount));
    }

    const timeLimitSeconds = timeOption === "none" ? null : Number(timeOption);
    onStart({ count, shuffle, timeLimitSeconds });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>퀴즈 시작 설정</h2>

        <div className="modal-section">
          <p className="modal-label">문제 수 ({totalCount}문제 중)</p>
          <div className="modal-options">
            <label>
              <input
                type="radio"
                checked={countOption === "all"}
                onChange={() => setCountOption("all")}
              />
              전체 ({totalCount}문제)
            </label>
            <label>
              <input
                type="radio"
                checked={countOption === "10"}
                onChange={() => setCountOption("10")}
                disabled={totalCount < 1}
              />
              10문제
            </label>
            <label>
              <input
                type="radio"
                checked={countOption === "20"}
                onChange={() => setCountOption("20")}
                disabled={totalCount < 1}
              />
              20문제
            </label>
            <label className="modal-custom-count">
              <input
                type="radio"
                checked={countOption === "custom"}
                onChange={() => setCountOption("custom")}
              />
              직접 입력
              <input
                type="number"
                className="modal-number-input"
                min={1}
                max={totalCount}
                value={customCount}
                onChange={(e) => {
                  setCountOption("custom");
                  setCustomCount(Number(e.target.value));
                }}
              />
            </label>
          </div>
        </div>

        <div className="modal-section">
          <label className="modal-checkbox">
            <input
              type="checkbox"
              checked={shuffle}
              onChange={(e) => setShuffle(e.target.checked)}
            />
            문제 순서 섞기
          </label>
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
                checked={timeOption === "300"}
                onChange={() => setTimeOption("300")}
              />
              5분
            </label>
            <label>
              <input
                type="radio"
                checked={timeOption === "600"}
                onChange={() => setTimeOption("600")}
              />
              10분
            </label>
            <label>
              <input
                type="radio"
                checked={timeOption === "900"}
                onChange={() => setTimeOption("900")}
              />
              15분
            </label>
          </div>
        </div>

        <div className="button-row">
          <button className="secondary" onClick={onCancel}>
            취소
          </button>
          <button className="primary" onClick={handleStart} disabled={totalCount === 0}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizStartModal;
