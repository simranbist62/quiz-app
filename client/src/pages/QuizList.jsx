import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuizzes } from "../api/quiz";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getQuizzes()
      .then((res) => setQuizzes(res.data.quizzes))
      .catch(() => setError("Could not load quizzes. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <p className="eyebrow">{quizzes.length} available</p>
      <h1 className="page-title">Pick a quiz</h1>
      <p className="page-subtitle">
        Every quiz is timed only by your patience. Answer, submit, see your
        mark.
      </p>

      {loading && <p className="loading-state">Loading quizzes…</p>}
      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && quizzes.length === 0 && (
        <div className="card empty-state">No quizzes yet. Check back soon.</div>
      )}

      <div className="quiz-list">
        {quizzes.map((quiz, i) => (
          <Link
            to={`/quizzes/${quiz._id}`}
            className="card quiz-card"
            key={quiz._id}
          >
            <span className="quiz-card__index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="quiz-card__category">{quiz.category}</p>
            <h2 className="quiz-card__title">{quiz.title}</h2>
            <p className="quiz-card__desc">{quiz.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
