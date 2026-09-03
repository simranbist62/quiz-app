const mongoose = require("mongoose");
const Question = require("../models/Question");
const Quiz = require("../models/Quiz");

// Create a question
const createQuestion = async (req, res) => {
    try {
        const { quizId, question, options, correctAnswer } = req.body;

        if (!quizId || !question || !options || !correctAnswer) {
            return res.status(400).json({
                message: "Quiz ID, question, options and correct answer are required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({
                message: "Invalid quiz ID",
            });
        }

        if (!Array.isArray(options) || options.length < 2) {
            return res.status(400).json({
                message: "At least 2 options are required",
            });
        }

        if (!options.includes(correctAnswer)) {
            return res.status(400).json({
                message: "Correct answer must be one of the options",
            });
        }

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        const newQuestion = await Question.create({
            quizId,
            question,
            options,
            correctAnswer,
        });

        return res.status(201).json({
            message: "Question created successfully",
            question: newQuestion,
        });
    } catch (error) {
        console.log("Create question error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Get all questions
const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().select("-correctAnswer");

        return res.status(200).json({
            questions,
        });
    } catch (error) {
        console.log("Get questions error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Get questions for one quiz
const getQuestionsByQuiz = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.quizId)) {
            return res.status(400).json({
                message: "Invalid quiz ID",
            });
        }

        const quiz = await Quiz.findById(req.params.quizId);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        const questions = await Question.find({
            quizId: req.params.quizId,
        }).select("-correctAnswer");

        return res.status(200).json({
            questions,
        });
    } catch (error) {
        console.log("Get questions by quiz error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Get one question
const getQuestionById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid question ID",
            });
        }

        const question = await Question.findById(req.params.id).select(
            "-correctAnswer"
        );

        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        return res.status(200).json({
            question,
        });
    } catch (error) {
        console.log("Get question error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Update a question
const updateQuestion = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid question ID",
            });
        }

        const { quizId, options, correctAnswer } = req.body;

        if (quizId && !mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({
                message: "Invalid quiz ID",
            });
        }

        if (options && (!Array.isArray(options) || options.length < 2)) {
            return res.status(400).json({
                message: "At least 2 options are required",
            });
        }

        if (quizId) {
            const quiz = await Quiz.findById(quizId);

            if (!quiz) {
                return res.status(404).json({
                    message: "Quiz not found",
                });
            }
        }

        const existingQuestion = await Question.findById(req.params.id);

        if (!existingQuestion) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        const nextOptions = options || existingQuestion.options;
        const nextCorrectAnswer =
            correctAnswer || existingQuestion.correctAnswer;

        if (!nextOptions.includes(nextCorrectAnswer)) {
            return res.status(400).json({
                message: "Correct answer must be one of the options",
            });
        }

        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        return res.status(200).json({
            message: "Question updated successfully",
            question,
        });
    } catch (error) {
        console.log("Update question error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Delete a question
const deleteQuestion = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid question ID",
            });
        }

        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        return res.status(200).json({
            message: "Question deleted successfully",
        });
    } catch (error) {
        console.log("Delete question error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Export all question functions
const questionController = {
    createQuestion,
    getQuestions,
    getQuestionsByQuiz,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};

module.exports = questionController;
