// Question schema

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
        },

        question: {
            type: String,
            required: [true, "Question is required"],
            trim: true,
        },

        options: {
            type: [String],
            required: [true, "Options are required"],
        },

        correctAnswer: {
            type: String,
            required: [true, "Correct answer is required"],
        },
    },
    { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;