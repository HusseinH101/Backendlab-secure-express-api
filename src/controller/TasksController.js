// Import the model so the controller can use database logic
import TasksModel from "../model/TasksModel.js"

// The controller handles HTTP requests and responses
class TasksController {

    // GET /api/tasks
    async getAllTasks(req, res) {
        try {
            const tasks = await TasksModel.getAllTasks()
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // GET /api/tasks/:id
    async getTaskById(req, res) {
        try {
            const { id } = req.params
            const task = await TasksModel.getTaskById(id)

            // If no task exists with that id, return 404
            if (!task) {
                return res.status(404).json({ error: "Task not found" })
            }

            res.json(task)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // POST /api/tasks
    async createTask(req, res) {
        try {
            const { title, description, status } = req.body

            // Basic validation
            if (!title) {
                return res.status(400).json({ error: "Title is required" })
            }

            const newTaskId = await TasksModel.createTask(
                title,
                description || "",
                status || "pending"
            )

            res.status(201).json({
                message: "Task created successfully",
                id: newTaskId
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // PUT /api/tasks/:id
    async updateTask(req, res) {
        try {
            const { id } = req.params
            const { title, description, status } = req.body

            // Check that task exists before updating
            const existingTask = await TasksModel.getTaskById(id)

            if (!existingTask) {
                return res.status(404).json({ error: "Task not found" })
            }

            // Use new values if provided, otherwise keep old values
            const updatedTitle = title ?? existingTask.title
            const updatedDescription = description ?? existingTask.description
            const updatedStatus = status ?? existingTask.status

            await TasksModel.updateTask(
                id,
                updatedTitle,
                updatedDescription,
                updatedStatus
            )

            res.json({ message: "Task updated successfully" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // DELETE /api/tasks/:id
    async deleteTask(req, res) {
        try {
            const { id } = req.params

            // Check that task exists before deleting
            const existingTask = await TasksModel.getTaskById(id)

            if (!existingTask) {
                return res.status(404).json({ error: "Task not found" })
            }

            await TasksModel.deleteTask(id)

            res.json({ message: "Task deleted successfully" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

// Export one instance of the controller
export default new TasksController()