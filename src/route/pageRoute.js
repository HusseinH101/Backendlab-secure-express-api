import express from "express"
import PageController from "../controller/PageController.js"

const router = express.Router()

// Landing page
router.get("/", PageController.index)

// Friday page
router.get("/todaysDate", PageController.friday)

export default router