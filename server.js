require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const quizRoutes = require("./routes/quizRoutes");
app.use("/api/quizzes", quizRoutes);

const questionRoutes = require("./routes/questionRoutes");
app.use("/api/questions", questionRoutes);

const resultRoutes = require("./routes/resultRoutes");
app.use("/api/results", resultRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error: ", error));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});