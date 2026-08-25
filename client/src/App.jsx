import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
            {/* Open app → redirect to Login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Quiz List */}
            <Route
              path="/quizzes"
              element={
                <ProtectedRoute>
                  <QuizList />
                </ProtectedRoute>
              }
            />

            {/* Protected Take Quiz */}
            <Route
              path="/quizzes/:id"
              element={
                <ProtectedRoute>
                  <TakeQuiz />
                </ProtectedRoute>
              }
            />

            {/* Protected Quiz Result */}
            <Route
              path="/quizzes/:id/result"
              element={
                <ProtectedRoute>
                  <QuizResult />
                </ProtectedRoute>
              }
            />

            {/* Protected My Results */}
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <MyResults />
                </ProtectedRoute>
              }
            />

            {/* Unknown URL → Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
