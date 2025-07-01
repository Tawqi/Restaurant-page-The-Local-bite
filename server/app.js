const express = require("express");
app = express()
const path = require("path");
const mongoose = require("mongoose")  ;
app.use(express.static("public"))
require('dotenv').config();

const MDBURL = process.env.MDBURL;
mongoose.connect(MDBURL)
    .then(() => app.listen(3000, ()=> console.log("its running")))
    .catch(err => console.log(err))

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})