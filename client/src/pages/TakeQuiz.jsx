import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsByQuiz, getQuizById, submitQuiz } from "../api/quiz";

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([getQuizById(id), getQuestionsByQuiz(id)])
      .then(([quizRes, questionsRes]) => {
        setQuiz(quizRes.data.quiz);
        setQuestions(questionsRes.data.questions);
      })
      .catch(() => setError("Could not load this quiz."))
      .finally(() => setLoading(false));
  }, [id]);

  const question = questions[current];
  const answeredCount = Object.keys(answers).length;
  const isLast = current === questions.length - 1;

  const progressPct = useMemo(() => {
    if (questions.length === 0) return 0;
    return Math.round(((current + 1) / questions.length) * 100);
  }, [current, questions.length]);

  const selectOption = (option) => {
    setAnswers((prev) => ({ ...prev, [question._id]: option }));
  };

  const goNext = () => setCurrent((c) => Math.min(c + 1, questions.length - 1));
  const goBack = () => setCurrent((c) => Math.max(c - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    const payload = questions.map((q) => ({
      questionId: q._id,
      answer: answers[q._id] ?? "",
    }));

    try {
      const res = await submitQuiz(id, payload);
      navigate(`/quizzes/${id}/result`, {
        state: { result: res.data, quizTitle: quiz?.title },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit quiz.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <p className="loading-state">Loading quiz…</p>
      </div>
    );
  }

  if (error && !question) {
    return (
      <div className="page">
        <div className="error-banner">{error}</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="page">
        <h1 className="page-title">{quiz?.title}</h1>
        <div className="card empty-state">This quiz has no questions yet.</div>
      </div>
    );
  }

  return (
    <div className="page">
      <p className="eyebrow">{quiz?.category}</p>
      <h1 className="page-title">{quiz?.title}</h1>

      <div className="quiz-progress">
        Question {current + 1} of {questions.length} · {answeredCount} answered
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="card">
        <p className="question-text">{question.question}</p>

        <div className="options">
          {question.options.map((option, i) => {
            const selected = answers[question._id] === option;
            return (
              <button
                key={option}
                type="button"
                className={`option${selected ? " option--selected" : ""}`}
                onClick={() => selectOption(option)}
              >
                <span className="option__letter">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="quiz-nav">
          <button
            className="btn btn--ghost"
            onClick={goBack}
            disabled={current === 0}
          >
            Back
          </button>

          {isLast ? (
            <button
              className="btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit quiz"}
            </button>
          ) : (
            <button className="btn" onClick={goNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
