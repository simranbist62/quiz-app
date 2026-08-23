// Result schema

const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
        },

        score: {
            type: Number,
            required: true,
        },

        totalQuestions: {
            type: Number,
            required: true,
        },

        percentage: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;