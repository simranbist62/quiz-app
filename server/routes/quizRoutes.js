const express = require("express");

const router = express.Router();

const {
    createQuiz,
    getQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    submitQuiz,
} = require("../controllers/quizController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createQuiz);

router.get("/", getQuizzes);

router.get("/:id", getQuizById);

router.put("/:id", authMiddleware, updateQuiz);

router.delete("/:id", authMiddleware, deleteQuiz);

// Submit a quiz - requires login
router.post("/:id/submit", authMiddleware, submitQuiz);

module.exports = router;