const express = require("express");
const cors = require('cors');
const db = require("./config/db");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(cors({ // CORS using the cors package
  origin: '*',
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

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

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Server listen
db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err.message);
  });
