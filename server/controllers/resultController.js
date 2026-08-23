const Result = require("../models/Result");

// Create a result
const createResult = async (req, res) => {
    try {
        const {
            quizId,
            score,
            totalQuestions,
            percentage,
        } = req.body;

        if (
            !quizId ||
            score === undefined ||
            !totalQuestions ||
            percentage === undefined
        ) {
            return res.status(400).json({
                message:
                    "Quiz ID, score and total questions are required",
            });
        }

        const result = await Result.create({
            userId: req.user.id,
            quizId,
            score,
            totalQuestions,
            percentage,
        });

        return res.status(201).json({
            message: "Result created successfully",
            result,
        });
    } catch (error) {
        console.log("CREATE RESULT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Get all results
const getResults = async (req, res) => {
    try {
        const results = await Result.find({
            userId: req.user.id,
        });

        return res.status(200).json({
            results,
        });
    } catch (error) {
        console.log("GET RESULTS ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Get one result
const getResultById = async (req, res) => {
    try {
        const result = await Result.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!result) {
            return res.status(404).json({
                message: "Result not found",
            });
        }

        return res.status(200).json({
            result,
        });
    } catch (error) {
        console.log("GET RESULT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const resultController = {
    createResult,
    getResults,
    getResultById,
};

module.exports = resultController;