const express = require("express");
const app = express();
const db = require("./config/db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body



app.get("/", function (req, res) {
  res.send("Welcom The Node Server....How Can I Help You");
});

//Import Router File
const bookRoutes = require('./routes/booksRoutes')

//user Routes
app.use('/books', bookRoutes)


// Server listen
app.listen(3000, () => {
  console.log("Server Is Listen 3000");
});
