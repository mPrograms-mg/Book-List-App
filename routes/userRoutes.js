const express = require("express")
const userRoutes = express.Router()
const { registerUser } = require('../controllers/auth/register')
const { loginUser } = require('../controllers/auth/login')

// Protected route example
// const authenticate = require('../middleware/authenticate'); // Assuming middleware is in a file named authenticate.js
// userRoutes.get('/api/protected', authenticate, (req, res) => {
//     res.status(200).json({ message: 'Access granted to protected route' });
// });

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)

module.exports = userRoutes