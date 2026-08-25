import { Link, useLocation, useParams } from "react-router-dom";

export default function QuizResult() {
  const { id } = useParams();
  const location = useLocation();
  const result = location.state?.result;
  const quizTitle = location.state?.quizTitle;

  if (!result) {
    return (
      <div className="page page--narrow">
        <div className="card empty-state">
          <p>No result to show. Take the quiz first.</p>
          <Link
            to={`/quizzes/${id}`}
            className="btn"
            style={{ marginTop: "1rem", display: "inline-block" }}
          >
            Go to quiz
          </Link>
        </div>
      </div>
    );
  }

  const { score, totalQuestions, percentage } = result;
  const passed = percentage >= 50;

  return (
    <div className="page page--narrow">
      <p className="eyebrow">{quizTitle}</p>
      <h1 className="page-title">Result</h1>

      <div className="card result-mark">
        <div
          className={`result-mark__score${passed ? " result-mark__score--pass" : ""}`}
        >
          {Math.round(percentage)}%
        </div>
        <div className="result-mark__fraction">
          {score} / {totalQuestions} correct
        </div>
        <div className="result-mark__label">
          {passed ? "Nice work." : "Worth another attempt."}
        </div>
      </div>

      <div className="btn-row" style={{ marginTop: "1.5rem" }}>
        <Link to="/" className="btn btn--ghost">
          Back to quizzes
        </Link>
        <Link to="/results" className="btn">
          View all results
        </Link>
      </div>
    </div>
  );
}
