import { useEffect, useState } from "react";
import { getQuizzes, getResults } from "../api/quiz";

export default function MyResults() {
  const [results, setResults] = useState([]);
  const [quizzesById, setQuizzesById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getResults(), getQuizzes()])
      .then(([resultsRes, quizzesRes]) => {
        setResults(resultsRes.data.results);
        const map = {};
        quizzesRes.data.quizzes.forEach((q) => {
          map[q._id] = q;
        });
        setQuizzesById(map);
      })
      .catch(() => setError("Could not load your results."))
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...results].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="page">
      <p className="eyebrow">Your history</p>
      <h1 className="page-title">Results</h1>
      <p className="page-subtitle">Every quiz you've completed, most recent first.</p>

      {loading && <p className="loading-state">Loading results…</p>}
      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && sorted.length === 0 && (
        <div className="card empty-state">
          You haven't completed a quiz yet.
        </div>
      )}

      <div className="quiz-grid">
        {sorted.map((result) => {
          const quiz = quizzesById[result.quizId];
          const passed = result.percentage >= 50;
          return (
            <div className="card result-row" key={result._id}>
              <div>
                <div className="result-row__quiz">
                  {quiz ? quiz.title : "Quiz"}
                </div>
                <div className="result-row__date">
                  {new Date(result.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div
                className="result-row__score"
                style={{ color: passed ? "var(--pass-green)" : "var(--pen-red)" }}
              >
                {Math.round(result.percentage)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
