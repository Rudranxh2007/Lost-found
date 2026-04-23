const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));

app.get("/", (req, res) => res.send("API Running"));

app.listen(5000, () => console.log("Server running"));
