const express = require("express");
const app = express()
const path = require("path");
const mongoose = require("mongoose")  ;
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const FoodItemDBM = require('./models/foodItems');

app.use(express.json()); // for parsing JSON body
app.use(express.urlencoded({ extended: true })); // for parsing form data


app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('public'));


const MDBURL = process.env.MDBURL;
mongoose.connect(MDBURL)
    .then(() => app.listen(3000, ()=> console.log("its running")))
    .catch(err => console.log(err))

app.post('/addProduct', (req,res) =>{
  console.log(req.body);
  const newProduct = new FoodItemDBM(req.body)
  newProduct.save()
    .then(() => res.send('product save'))
    .catch(err => {
      console.error(err); 
        res.status(500).send('Error saving product')});

})
app.get('/adminpage', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'adminpage.html'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/fooditem/:cate', (req, res) => {
  FoodItemDBM.find({ category: req.params.cate })
    .then((data) => res.json(data))
    .catch((err) => 
      res.status(500).json({ error: "Something went wrong" })
    );
});
