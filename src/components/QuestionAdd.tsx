import { useRef, useState } from "react";
import type { Question } from "../types";
import { parseQuestionsJson, QUESTION_FILE_EXAMPLE } from "../questionImport";

interface QuestionAddProps {
  onSave: (title: string, questions: Omit<Question, "id">[]) => void;
  onCancel: () => void;
}

type Tab = "manual" | "file";

function QuestionAdd({ onSave, onCancel }: QuestionAddProps) {
  const [tab, setTab] = useState<Tab>("file");
  const [setTitle, setSetTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  // 직접 입력 탭 상태
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answerIndex, setAnswerIndex] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");
  const [manualError, setManualError] = useState("");

  // 파일 추가 탭 상태
  const [parsedQuestions, setParsedQuestions] = useState<Omit<Question, "id">[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [fileNotice, setFileNotice] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!setTitle.trim()) {
      setTitleError("문제집 이름을 입력해주세요.");
      return;
    }

    const trimmedOptions = options.map((opt) => opt.trim());
    const filledOptions = trimmedOptions.filter((opt) => opt.length > 0);

    if (!question.trim()) {
      setManualError("문제를 입력해주세요.");
      return;
    }
    if (filledOptions.length < 2) {
      setManualError("보기를 2개 이상 입력해주세요.");
      return;
    }
    if (
      answerIndex === null ||
      trimmedOptions[answerIndex] === undefined ||
      trimmedOptions[answerIndex].length === 0
    ) {
      setManualError("정답으로 선택한 보기를 입력해주세요.");
      return;
    }
    if (!explanation.trim()) {
      setManualError("해설을 입력해주세요.");
      return;
    }

    setTitleError("");

    // 빈 보기는 제외하고, 정답 인덱스를 다시 계산해서 저장
    const answerText = trimmedOptions[answerIndex];
    const finalOptions = trimmedOptions.filter((opt) => opt.length > 0);
    const finalAnswerIndex = finalOptions.indexOf(answerText);

    onSave(setTitle.trim(), [
      {
        question: question.trim(),
        options: finalOptions,
        answerIndexes: [finalAnswerIndex],
        explanation: explanation.trim(),
      },
    ]);
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    const mergedQuestions: Omit<Question, "id">[] = [];
    const mergedErrors: string[] = [];

    for (const file of files) {
      const text = await file.text();
      const { questions, errors } = parseQuestionsJson(text);
      mergedQuestions.push(...questions);
      mergedErrors.push(...errors.map((err) => `[${file.name}] ${err}`));
    }

    setParsedQuestions(mergedQuestions);
    setParseErrors(mergedErrors);
    setFileNotice(
      mergedQuestions.length > 0
        ? `${mergedQuestions.length}개의 문제를 인식했어요.`
        : ""
    );
  };

  const handleConfirmImport = () => {
    if (parsedQuestions.length === 0) return;
    if (!setTitle.trim()) {
      setTitleError("문제집 이름을 입력해주세요.");
      return;
    }
    setTitleError("");
    onSave(setTitle.trim(), parsedQuestions);
  };

  return (
    <div className="screen">
      <span className="eyebrow">✦ Add Questions</span>
      <h1>문제집 추가하기</h1>

      <label className="set-title-field">
        문제집 이름
        <input
          type="text"
          value={setTitle}
          onChange={(e) => setSetTitle(e.target.value)}
          placeholder="예: JSM 2"
        />
      </label>
      {titleError && <p className="error">{titleError}</p>}

      <div className="tabs">
        <button
          type="button"
          className={tab === "file" ? "tab active" : "tab"}
          onClick={() => setTab("file")}
        >
          파일로 한번에 추가
        </button>
        <button
          type="button"
          className={tab === "manual" ? "tab active" : "tab"}
          onClick={() => setTab("manual")}
        >
          직접 입력
        </button>
      </div>

      {tab === "file" && (
        <div className="file-import">
          <p className="hint">
            아래 형식의 JSON 파일을 올리면 여러 문제를 한 번에 새 문제집으로 추가할 수 있어요.
            (여러 파일 동시 선택 가능, 복수 정답은 "answers"/"answerIndexes" 사용)
          </p>
          <pre className="code-block">
            <code>{QUESTION_FILE_EXAMPLE}</code>
          </pre>

          <label className="file-drop">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
            />
            <span>+ JSON 파일 선택하기</span>
          </label>

          {fileNotice && <p className="success">{fileNotice}</p>}

          {parseErrors.length > 0 && (
            <div className="error-list">
              <p className="error">인식하지 못한 항목이 있어요:</p>
              <ul>
                {parseErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {parsedQuestions.length > 0 && (
            <ul className="preview-list">
              {parsedQuestions.map((q, i) => (
                <li key={i}>{q.question}</li>
              ))}
            </ul>
          )}

          <div className="button-row">
            <button type="button" className="secondary" onClick={onCancel}>
              취소
            </button>
            <button
              type="button"
              className="primary"
              onClick={handleConfirmImport}
              disabled={parsedQuestions.length === 0}
            >
              {parsedQuestions.length > 0
                ? `${parsedQuestions.length}개 문제로 문제집 만들기`
                : "문제집 만들기"}
            </button>
          </div>
        </div>
      )}

      {tab === "manual" && (
        <form className="question-form" onSubmit={handleManualSubmit}>
          <label>
            문제
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="문제를 입력하세요"
              rows={3}
            />
          </label>

          <div className="options-group">
            <p>보기 (정답에 체크하세요)</p>
            {options.map((opt, index) => (
              <div className="option-row" key={index}>
                <input
                  type="radio"
                  name="answer"
                  checked={answerIndex === index}
                  onChange={() => setAnswerIndex(index)}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`보기 ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <label>
            해설
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="정답에 대한 해설을 입력하세요"
              rows={3}
            />
          </label>

          {manualError && <p className="error">{manualError}</p>}

          <div className="button-row">
            <button type="button" className="secondary" onClick={onCancel}>
              취소
            </button>

            <button type="submit" className="primary">
              저장
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default QuestionAdd;
