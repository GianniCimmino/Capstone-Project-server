require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/products.js");
const authRoutes = require("./routes/auth.js");
const reviewRoutes = require("./routes/reviews.js");

const app = express();
const PORT = process.env.PORT || 5000;
const ORIGINS = ["http://localhost:5000"];

console.log("MONGODB_URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());
app.use(cors({ origin: ORIGINS }));

app.get("/", (req, res) => {
  res.json("<h1>Server in funzione</h1>");
});

app.use("/api/products", productRoutes);
app.use("/api/community", reviewRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});