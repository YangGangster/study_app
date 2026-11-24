import type { HistoryEntry } from "../types";

interface StatsProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
  onExit: () => void;
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleString("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Stats({ history, onClearHistory, onExit }: StatsProps) {
  return (
    <div className="screen">
      <div className="quiz-header">
        <button className="link-button" onClick={onExit}>
          ← 홈으로
        </button>
      </div>
      <span className="eyebrow">✦ Stats</span>
      <h1>통계/기록</h1>
      <p className="subtitle">총 {history.length}회 응시했어요.</p>

      {history.length === 0 ? (
        <p className="hint">아직 완료한 퀴즈가 없어요. 문제를 풀면 여기에 기록이 쌓여요.</p>
      ) : (
        <>
          <ul className="history-list">
            {history.map((entry) => (
              <li key={entry.id} className={`history-item ${entry.isPass ? "correct" : "incorrect"}`}>
                <div className="history-item-main">
                  <span className="history-label">{entry.label}</span>
                  <span className="history-date">{formatDate(entry.timestamp)}</span>
                </div>
                <div className="history-item-score">
                  <span>
                    {entry.correctCount} / {entry.total} ({entry.scorePercent}%)
                  </span>
                  <span className={`history-tag ${entry.isPass ? "pass" : "fail"}`}>
                    {entry.isPass ? "PASS" : "FAIL"}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <button className="link-button" onClick={onClearHistory}>
            기록 전체 삭제
          </button>
        </>
      )}
    </div>
  );
}

export default Stats;
