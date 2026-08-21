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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error: ", error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});
