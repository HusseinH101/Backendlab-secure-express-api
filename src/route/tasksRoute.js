// Import Express to create routes
import express from "express"

import verifyAPIKey from "../middleware/verifyAPIkey.js"

// Import the controller that contains the logic for tasks
import TasksController from "../controller/TasksController.js"

// Create a router object
const router = express.Router()

// GET all tasks
router.get("/tasks", verifyAPIKey, TasksController.getAllTasks)
// GET one task by id
router.get("/tasks/:id", TasksController.getTaskById)

// POST create a new task
router.post("/tasks", TasksController.createTask)

// PUT update a task by id
router.put("/tasks/:id", TasksController.updateTask)

// DELETE a task by id
router.delete("/tasks/:id", TasksController.deleteTask)

// Export the router
export default router