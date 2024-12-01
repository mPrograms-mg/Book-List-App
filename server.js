const express = require("express");
const db = require("./config/db");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

//Import Router File
const bookRoutes = require('./routes/booksRoutes')
const userRoutes = require('./routes/userRoutes')

//user Routes
app.use('/books', bookRoutes)
app.use('/api', userRoutes)


// Protected route example
const authenticate = require('./middleware/authenticate'); // Assuming middleware is in a file named authenticate.js

app.get('/api/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'Access granted to protected route' });
});

// Server listen
app.listen(PORT, () => {
  console.log("Server Is Listen 3000");
  db()
});
