import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/quiz";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(email, password);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Could not register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page--narrow">
      <p className="eyebrow">First time here</p>
      <h1 className="page-title">Create an account</h1>
      <p className="page-subtitle">Track your quiz results over time.</p>

      <div className="card">
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error-banner">{error}</div>}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="form-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
