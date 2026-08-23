import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import QuizList from "./pages/QuizList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TakeQuiz from "./pages/TakeQuiz";
import QuizResult from "./pages/QuizResult";
import MyResults from "./pages/MyResults";
import "./app.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="layout">
          <Navbar />

          <Routes>
            <Route path="/" element={<QuizList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/quizzes/:id"
              element={
                <ProtectedRoute>
                  <TakeQuiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quizzes/:id/result"
              element={
                <ProtectedRoute>
                  <QuizResult />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <MyResults />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
