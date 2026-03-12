import express from "express"
import AuthController from "../controller/AuthController.js"
import verifyJWT from "../middleware/verifyJWT.js"

const router = express.Router()

// Login route
router.post("/login", AuthController.login)

// Protected route that requires a valid JWT
router.get("/protected", verifyJWT, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user: req.user
    })
})

export default router