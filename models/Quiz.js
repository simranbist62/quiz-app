// Quiz schema

const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Quiz title is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Quiz description is required"],
            trim: true,
        },

        category: {
            type: String,
            required: [true, "Quiz category is required"],
            trim: true,
        },
    },
    { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;