import type { Question, QuestionAnswer } from "../types";
import { isAnswerCorrect } from "../quizUtils";

interface ResultProps {
  questions: Question[];
  answers: Record<string, QuestionAnswer>;
  onRestart: () => void;
  onHome: () => void;
}

function Result({ questions, answers, onRestart, onHome }: ResultProps) {
  const correctCount = questions.filter((q) =>
    isAnswerCorrect(answers[q.id]?.selectedIndexes ?? [], q.answerIndexes)
  ).length;
  const total = questions.length;
  const scorePercent = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  // 실제 JSM 시험 합격 기준(25문제 중 17문제 이상 = 68%)에 맞춘 합격선
  const requiredCorrect = Math.ceil(total * (17 / 25));
  const isPass = correctCount >= requiredCorrect;
  const badge = isPass
    ? { className: "great", label: `합격 PASS (${requiredCorrect}문제 이상) 🎉` }
    : { className: "low", label: `불합격 FAIL (${requiredCorrect}문제 이상 필요) 💪` };


  return (
    <div className="screen result">
      <span className="eyebrow">✦ Result</span>
      <h1>최종 결과</h1>
      <div className="score-summary">
        <p className="score-number">
          {correctCount} / {total}
        </p>
        <p className="score-percent">정답률 {scorePercent}%</p>
        <span className={`score-badge ${badge.className}`}>{badge.label}</span>
      </div>

      <ul className="review-list">
        {questions.map((q, index) => {
          const selectedIndexes = answers[q.id]?.selectedIndexes ?? [];
          const isCorrect = isAnswerCorrect(selectedIndexes, q.answerIndexes);
          const selectedText = selectedIndexes.length
            ? selectedIndexes.map((i) => q.options[i]).join(", ")
            : "선택 안 함";
          const correctText = q.answerIndexes.map((i) => q.options[i]).join(", ");

          return (
            <li key={q.id} className={`review-item ${isCorrect ? "correct" : "incorrect"}`}>
              <div className="review-header">
                <span className="review-mark">{isCorrect ? "O" : "X"}</span>
                <span className="review-question">
                  {index + 1}. {q.question}
                </span>
              </div>
              <p>내가 고른 답: {selectedText}</p>
              {!isCorrect && <p>정답: {correctText}</p>}
              <p className="explanation">해설: {q.explanation}</p>
            </li>
          );
        })}
      </ul>

      <div className="button-row">
        <button className="secondary" onClick={onHome}>
          홈으로
        </button>
        <button className="primary" onClick={onRestart}>
          다시 풀기
        </button>
      </div>
    </div>
  );
}

export default Result;
