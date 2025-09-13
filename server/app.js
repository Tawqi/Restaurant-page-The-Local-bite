  const express = require("express"); // Import Express framework
const app = express(); // Initialize Express app
const path = require("path"); // Import path module for file paths
const mongoose = require("mongoose"); // Import Mongoose for MongoDB
require("dotenv").config(); // Load environment variables
const cors = require("cors"); // Import CORS middleware

const FoodItemDBM = require("./models/foodItems"); // Import FoodItem model

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Serve static files
app.use(express.static(path.join(__dirname, "dist"))); // Serve static files from dist folder
app.use("/images", express.static(path.join(__dirname, "public", "images"))); // Serve images from public/images
app.use("/adminpage", express.static(path.join(__dirname, "public"))); // Serve admin page from public

// --- API Routes ---
app.post("/addProduct", (req, res) => {
  // Route to add new product
  const categories = req.body.category.split(",").map((c) => c.trim()); // Split and trim categories
  const ingredients = req.body.ingredients.split(",").map((i) => i.trim()); // Split and trim ingredients

  const newProduct = new FoodItemDBM({
    // Create new product instance
    ...req.body, // Spread request body
    category: categories, // Set categories array
    ingredients: ingredients, // Set ingredients array
    available: req.body.available === "true", // Convert available to boolean
  });

  newProduct
    .save() // Save product to database
    .then(() => res.send("Product saved")) // Send success response
    .catch((err) => {
      // Handle errors
      console.error(err); // Log error
      res.status(500).send("Error saving product"); // Send error response
    });
});

app.get("/api/categories", async (req, res) => {
  // Route to get all categories
  try {
    const allCategories = await FoodItemDBM.distinct("category"); // Get unique categories
    const flat = [...new Set(allCategories.flat())]; // Flatten and remove duplicates
    res.json(flat); // Send categories as JSON
  } catch (err) {
    res.status(500).json({ error: "Error fetching categories" }); // Send error response
  }
});

app.get("/api/fooditems/:cate", (req, res) => {
  // Route to get items by category
  const category = req.params.cate; // Get category from URL
  FoodItemDBM.find({ category: { $regex: new RegExp(`^${category}$`, "i") } }) // Find items by category (case-insensitive)
    .then((data) => res.json(data)) // Send items as JSON
    .catch(() => res.status(500).json({ error: "Something went wrong" })); // Send error response
});

app.get("/api/fooditem/id/:id", (req, res) => {
  // Route to get item by ID
  FoodItemDBM.findById(req.params.id) // Find item by ID
    .then((data) => res.json(data)) // Send item as JSON
    .catch(() => res.status(500).json({ error: "Item not found" })); // Send error response
});

app.get("/api/fooditems/byids/:ids", async (req, res) => {
  // Route to get multiple items by IDs
  try {
    const ids = req.params.ids.split(","); // Split IDs from URL
    if (ids.length === 0)
      return res.status(400).json({ error: "No IDs provided" }); // Check for valid IDs
    const items = await FoodItemDBM.find({ _id: { $in: ids } }); // Find items by IDs
    res.json(items); // Send items as JSON
  } catch (err) {
    console.error(err); // Log error
    res.status(500).json({ error: "Server error" }); // Send error response
  }
});

// --- React Routes fallback ---
app.get(/^\/(?!api|images|adminpage).*/, (req, res) => {
  // Fallback for client-side routes
  res.sendFile(path.join(__dirname, "dist", "index.html")); // Serve React app's index.html
});

// --- Connect to DB and Start Server ---
const MDBURL = process.env.MDBURL; // Get MongoDB URL from env
// const MDBURL = process.env.MONGOURL; // Get MongoDB URL from compose.yaml
mongoose
  .connect(MDBURL, { useNewUrlParser: true, useUnifiedTopology: true }) // Connect to MongoDB
  .then(() =>
    app.listen(3000, () => console.log("Server running on port 3000"))
  ) // Start server on port 3000
  .catch((err) => console.log(err)); // Log connection errors
