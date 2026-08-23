const express = require("express");

console.log("RESULT ROUTES LOADED");

const router = express.Router();

const {
    createResult,
    getResults,
    getResultById,
} = require("../controllers/resultController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createResult);

router.get("/", authMiddleware, getResults);

router.get("/:id", authMiddleware, getResultById);

module.exports = router;