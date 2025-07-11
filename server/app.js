const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const FoodItemDBM = require('./models/foodItems');

app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data

// Serve static files first
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// API routes (before wildcard)
app.post('/addProduct', (req, res) => {
  const categories = req.body.category.split(',').map(c => c.trim());
  const ingredients = req.body.ingredients.split(',').map(i => i.trim());

  const newProduct = new FoodItemDBM({
    ...req.body,
    category: categories,
    ingredients: ingredients,
    available: req.body.available === 'true'
  });

  newProduct.save()
    .then(() => res.send('Product saved'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving product');
    });
});

app.get('/adminpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adminpage.html'));
});

app.get('/api/categories', async (req, res) => {
  try {
    const allCategories = await FoodItemDBM.distinct('category');
    const flat = [...new Set(allCategories.flat())];
    res.json(flat);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

app.get('/api/fooditems/:cate', (req, res) => {
  const category = req.params.cate;
  FoodItemDBM.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } })
    .then(data => res.json(data))
    .catch(() => res.status(500).json({ error: "Something went wrong" }));
});

app.get('/api/fooditem/id/:id', (req, res) => {
  FoodItemDBM.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: "Item not found" }));
});

// This wildcard route must come last — sends React app for all other routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const MDBURL = process.env.MDBURL;
mongoose.connect(MDBURL)
  .then(() => app.listen(3000, () => console.log("Server running on port 3000")))
  .catch(err => console.log(err));
