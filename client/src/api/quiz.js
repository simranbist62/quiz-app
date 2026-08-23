import client from "./client";

// Auth
export const registerUser = (email, password) =>
  client.post("/auth/register", { email, password });

export const loginUser = (email, password) =>
  client.post("/auth/login", { email, password });

// Quizzes
export const getQuizzes = () => client.get("/quizzes");

export const getQuizById = (id) => client.get(`/quizzes/${id}`);

export const submitQuiz = (id, answers) =>
  client.post(`/quizzes/${id}/submit`, { answers });

// Questions
export const getQuestionsByQuiz = (quizId) =>
  client.get(`/questions/quiz/${quizId}`);

// Results
export const getResults = () => client.get("/results");

export const getResultById = (id) => client.get(`/results/${id}`);
