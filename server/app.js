const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");

const FoodItemDBM = require("./models/foodItems");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "dist")));
app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use("/adminpage", express.static(path.join(__dirname, "public")));

// --- API Routes ---
app.post("/addProduct", (req, res) => {
  const categories = req.body.category.split(',').map(c => c.trim());
  const ingredients = req.body.ingredients.split(',').map(i => i.trim());

  const newProduct = new FoodItemDBM({
    ...req.body,
    category: categories,
    ingredients: ingredients,
    available: req.body.available === 'true'
  });

  newProduct.save()
    .then(() => res.send("Product saved"))
    .catch(err => {
      console.error(err);
      res.status(500).send("Error saving product");
    });
});

app.get("/api/categories", async (req, res) => {
  try {
    const allCategories = await FoodItemDBM.distinct("category");
    const flat = [...new Set(allCategories.flat())];
    res.json(flat);
  } catch (err) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

app.get("/api/fooditems/:cate", (req, res) => {
  const category = req.params.cate;
  FoodItemDBM.find({ category: { $regex: new RegExp(`^${category}$`, "i") } })
    .then(data => res.json(data))
    .catch(() => res.status(500).json({ error: "Something went wrong" }));
});

app.get("/api/fooditem/id/:id", (req, res) => {
  FoodItemDBM.findById(req.params.id)
    .then(data => res.json(data))
    .catch(() => res.status(500).json({ error: "Item not found" }));
});

// --- React Routes fallback ---
app.get(/^\/(?!api|images|adminpage).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- Connect to DB and Start Server ---
const MDBURL = process.env.MDBURL;
mongoose.connect(MDBURL)
  .then(() => app.listen(3000, () => console.log("Server running on port 3000")))
  .catch(err => console.log(err));
