import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, email, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        Quizzly<span>v1</span>
      </Link>

      <nav className="navbar__links">
        <Link to="/">Quizzes</Link>
        {isAuthenticated && <Link to="/results">My results</Link>}

        {isAuthenticated ? (
          <>
            <span className="navbar__user">{email}</span>
            <button className="btn-link" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </nav>
    </header>
  );
}
