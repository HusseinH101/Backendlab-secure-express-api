import dotenv from "dotenv"
dotenv.config()

import express from "express"
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from "url"
import expressLayouts from "express-ejs-layouts"
import session from "express-session"

import tasksRoute from "./route/tasksRoute.js"
import authRoute from "./route/authRoute.js"
import webTasksRoute from "./route/webTasksRoute.js"
import pageRoute from "./route/pageRoute.js"
import flashMessages from "./middleware/flashMessages.js"

const app = express()

// Recreate __filename and __dirname because ES modules do not have them by default
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Add security-related HTTP headers
app.use(helmet())

// Hide that the server is running on Express
app.disable("x-powered-by")

// Allow the server to read JSON request bodies
app.use(express.json())

// Allow the server to read form data from HTML forms
app.use(express.urlencoded({ extended: false }))

// Enable sessions and use the secret from .env
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// Make flash messages available in all views
app.use(flashMessages)

// Set EJS as the template engine
app.set("view engine", "ejs")

// Tell Express where the views folder is located
app.set("views", path.join(__dirname, "../views"))

// Enable layout support for EJS
app.use(expressLayouts)
app.set("layout", "layout")

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "../public")))

// Register API routes
app.use("/api", tasksRoute)
app.use("/api", authRoute)

// Register web page routes
app.use("/", pageRoute)
app.use("/tasks", webTasksRoute)

export default app