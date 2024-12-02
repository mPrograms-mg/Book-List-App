const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../../models/user');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // Replace with a secure key in production

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const exitUser = await User.findOne({ email: email })
        if (!exitUser) {
            return res.status(400).json({ message: "email not found" })
        }
        const matchPassword = await bcryptjs.compare(password, exitUser.password)

        if (!matchPassword) {
            return res.status(400).json({ message: "invalid password" })
        }

        const token = await jwt.sign({ email: email }, JWT_SECRET)
        res.status(201).json({ message: 'User Login successfully', response: { email, matchPassword }, token: token });
    } catch (error) {
        console.log(error);
    }



}


module.exports = { loginUser }
