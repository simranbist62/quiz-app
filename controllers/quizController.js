const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Result = require("../models/Result");

// Create a quiz
const createQuiz = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({
                message: "Title, description and category are required",
            });
        }

        const quiz = await Quiz.create({
            title,
            description,
            category,
        });

        return res.status(201).json({
            message: "Quiz created successfully",
            quiz,
        });
    } catch (error) {
        console.log("Create quiz error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Get all quizzes
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();

        return res.status(200).json({
            quizzes,
        });
    } catch (error) {
        console.log("Get quizzes error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Get one quiz
const getQuizById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid quiz ID",
            });
        }

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        return res.status(200).json({
            quiz,
        });
    } catch (error) {
        console.log("Get quiz error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Update a quiz
const updateQuiz = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid quiz ID",
            });
        }
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        return res.status(200).json({
            message: "Quiz updated successfully",
            quiz,
        });
    } catch (error) {
        console.log("Update quiz error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Delete a quiz
const deleteQuiz = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid quiz ID",
            });
        }
        const quiz = await Quiz.findByIdAndDelete(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        return res.status(200).json({
            message: "Quiz deleted successfully",
        });
    } catch (error) {
        console.log("Delete quiz error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Submit a quiz and calculate score
const submitQuiz = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid quiz ID",
            });
        }
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({
                message: "Answers are required",
            });
        }

        let score = 0;

        for (const answer of answers) {
            const question = await Question.findById(answer.questionId);

            if (!question) {
                continue;
            }

            if (answer.answer === question.correctAnswer) {
                score++;
            }
        }

        const totalQuestions = answers.length;
        const percentage = (score / totalQuestions) * 100;

        const result = await Result.create({
            userId: req.user.id,
            quizId: req.params.id,
            score,
            totalQuestions,
            percentage,
        });

        return res.status(201).json({
            message: "Quiz submitted successfully",
            score,
            totalQuestions,
            percentage,
            result,
        });
    } catch (error) {
        console.log("Submit quiz error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Export all quiz functions
const quizController = {
    createQuiz,
    getQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    submitQuiz,
};

module.exports = quizController;