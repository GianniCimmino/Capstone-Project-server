const express = require("express");
const Product = require("../models/product");
const verifyTokenAndAuthorizeRoles = require("../middlewares/auth");
const router = express.Router();

// Ottieni tutti i prodotti
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Aggiungi un prodotto
router.post(
  "/",
  verifyTokenAndAuthorizeRoles(["ADD_PRODUCT"]),
  async (req, res) => {
    const product = new Product(req.body);
    try {
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Modifica un prodotto
router.put(
  "/:id",
  verifyTokenAndAuthorizeRoles(["UPDATE_PRODUCT"]),
  async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Elimina un prodotto
router.delete(
  "/:id",
  verifyTokenAndAuthorizeRoles(["DELETE_PRODUCT"]),
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Prodotto eliminato con successo!" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
