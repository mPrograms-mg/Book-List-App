const express = require("express");
const app = express();
const db = require("./config/db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

require('dotenv').config();



app.get("/", function (req, res) {
  res.send("Welcom The Node Server....How Can I Help You");
});

//Import Router File
const bookRoutes = require('./routes/booksRoutes')

//user Routes
app.use('/books', bookRoutes)

const PORT = process.env.PORT || 3000

// Server listen
app.listen(PORT, () => {
  console.log("Server Is Listen 3000");
});
