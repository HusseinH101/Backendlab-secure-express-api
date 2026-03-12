import jwt from "jsonwebtoken"

// Middleware that verifies a JWT token from the Authorization header
function verifyJWT(req, res, next) {
    // Read the Authorization header
    const authHeader = req.headers["authorization"]

    // Check that the header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid token" })
    }

    // Extract the token part after "Bearer "
    const token = authHeader.split(" ")[1]

    try {
        // Verify the token using the secret from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Save decoded user information on the request object
        req.user = decoded

        // Continue to the protected route
        next()
    } catch (error) {
        // If token is invalid or expired
        res.status(401).json({ error: "Invalid token" })
    }
}

export default verifyJWT