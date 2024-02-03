const express = require("express");
const Product = require("../models/product");
const Review = require("../models/review"); // Assicurati di creare il modello Review
const tokenValidator = require("../middlewares/auth");
const router = express.Router();

// Ottieni tutte le recensioni di un prodotto
router.get("/:productId/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Aggiungi una recensione a un prodotto
router.post("/:productId/reviews", tokenValidator(), async (req, res) => {
  const { userId, rating, comment } = req.body;

  try {
    // Assicurati che il prodotto esista
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Prodotto non trovato." });
    }

    const review = new Review({
      userId,
      productId: req.params.productId,
      rating,
      comment,
    });
    const savedReview = await review.save();

    // Aggiorna la media del rating del prodotto
    const existingReviews = await Review.find({
      productId: req.params.productId,
    });
    const totalRating = existingReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / existingReviews.length;
    product.averageRating = averageRating;
    await product.save();

    res.json(savedReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Modifica una recensione di un prodotto
router.put("/reviews/:reviewId", tokenValidator(), async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true }
    );
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Elimina una recensione di un prodotto
router.delete("/reviews/:reviewId", tokenValidator(), async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);
    res.json({ message: "Recensione eliminata con successo." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
