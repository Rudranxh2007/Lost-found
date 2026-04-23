const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err.message));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Dynamic PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));