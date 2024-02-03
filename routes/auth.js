const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Account = require("../models/account.js");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await Account.findOne({ username });
    if (!user) {
      return res.status(400).json("Account non trovato.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Password invalida.");
    }

    const token = jwt.sign(
      { _id: user._id, roles: user.roles },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: { _id: user._id, username: user.username, roles: user.roles },
    });
  } catch (err) {
    res.status(500).json("Server error");
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica se l'utente esiste già
    let user = await Account.findOne({ username });
    if (user) {
      return res.status(400).json("Esiste già un account con questo username");
    }

    user = new Account({ username, password });

    // Salva il nuovo utente nel database
    await user.save();

    // Crea un token per il nuovo utente
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      token,
      user: { _id: user._id, username: user.username, roles: user.roles },
    });
  } catch (err) {
    res.status(500).json("Error in saving");
  }
});

module.exports = router;
