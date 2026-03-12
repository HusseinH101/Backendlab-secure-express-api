import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UsersModel from "../model/UsersModel.js"

// Controller that handles user authentication
class AuthController {

    // Handle login and return a JWT token if login succeeds
    async login(req, res) {
        try {
            // Read username and password from the request body
            const { username, password } = req.body

            // Find the user in the database
            const user = await UsersModel.findByUsername(username)

            // If user does not exist, return an error
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" })
            }

            // Compare entered password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password)

            // If password does not match, return an error
            if (!passwordMatch) {
                return res.status(401).json({ error: "Invalid credentials" })
            }

            // Create a JWT token that contains user information
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )

            // Send success response with the token
            res.json({
                message: "Login successful",
                token: token
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default new AuthController()