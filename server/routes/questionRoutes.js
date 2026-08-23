const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const {
    createQuestion,
    getQuestions,
    getQuestionsByQuiz,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
} = require("../controllers/questionController");

router.post("/", authMiddleware, createQuestion);

router.get("/", getQuestions);

// Get all questions for one quiz
router.get("/quiz/:quizId", getQuestionsByQuiz);

router.get("/:id", getQuestionById);

router.put("/:id", authMiddleware, updateQuestion);

router.delete("/:id", authMiddleware, deleteQuestion);

module.exports = router;