require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productsRoutes = require("./routes/products.js");
const authRoutes = require("./routes/auth.js");
const reviewRoutes = require("./routes/reviews.js");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    "http://localhost:5000",
    "http://localhost:5001",
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Abilita l'invio dei cookie nelle richieste CORS
  optionsSuccessStatus: 204,
};

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Impossibile connettersi a MongoDB", err));

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("<h1>Server in funzione</h1>");
});

app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Il server è in esecuzione sulla porta: ${PORT}`);
});
