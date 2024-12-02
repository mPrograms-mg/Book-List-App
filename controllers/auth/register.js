const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../../models/user');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // Replace with a secure key in production

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashPassword = await bcryptjs.hash(password, 10)
        // Create and save the new user
        const result = await User.create({
            email: email,
            password: hashPassword

        })

        const token = jwt.sign({ email: result.email }, JWT_SECRET)
        res.status(201).json({ message: 'User registered successfully', response: result, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { registerUser }

