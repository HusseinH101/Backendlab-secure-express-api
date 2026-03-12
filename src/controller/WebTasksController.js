import TasksModel from "../model/TasksModel.js"

class WebTasksController {

    // Show all tasks
    async index(req, res) {
        try {
            const tasks = await TasksModel.getAllTasks()
            res.render("tasks/index", { tasks })
        } catch (error) {
            console.error("Error loading tasks page:", error)
            res.status(500).send("Could not load tasks page")
        }
    }

    // Show one task
    async show(req, res) {
        try {
            const { id } = req.params
            const task = await TasksModel.getTaskById(id)

            if (!task) {
                return res.status(404).send("Task not found")
            }

            res.render("tasks/show", { task })
        } catch (error) {
            console.error("Error loading task:", error)
            res.status(500).send("Could not load task")
        }
    }

    // Show form for creating a new task
    createForm(req, res) {
        res.render("tasks/create")
    }

    // Save the new task to the database
    async create(req, res) {
        try {
            const { title, description, status } = req.body

            if (!title) {
                return res.status(400).send("Title is required")
            }

            await TasksModel.createTask(
                title,
                description || "",
                status || "pending"
            )

            req.session.flashMessage = "Task created successfully"
            res.redirect("/tasks")
        } catch (error) {
            console.error("Error creating task:", error)
            res.status(500).send("Could not create task")
        }
    }

    // Show form for editing a task
    async editForm(req, res) {
        try {
            const { id } = req.params
            const task = await TasksModel.getTaskById(id)

            if (!task) {
                return res.status(404).send("Task not found")
            }

            res.render("tasks/edit", { task })
        } catch (error) {
            console.error("Error loading edit page:", error)
            res.status(500).send("Could not load edit page")
        }
    }

    // Save edited task to database
    async update(req, res) {
        try {
            const { id } = req.params
            const { title, description, status } = req.body

            const existingTask = await TasksModel.getTaskById(id)

            if (!existingTask) {
                return res.status(404).send("Task not found")
            }

            await TasksModel.updateTask(
                id,
                title || existingTask.title,
                description || "",
                status || existingTask.status
            )

            req.session.flashMessage = "Task updated successfully"
            res.redirect("/tasks")
        } catch (error) {
            console.error("Error updating task:", error)
            res.status(500).send("Could not update task")
        }
    }

    // Delete a task
    async delete(req, res) {
        try {
            const { id } = req.params

            const existingTask = await TasksModel.getTaskById(id)

            if (!existingTask) {
                return res.status(404).send("Task not found")
            }

            await TasksModel.deleteTask(id)

            req.session.flashMessage = "Task deleted successfully"
            res.redirect("/tasks")
        } catch (error) {
            console.error("Error deleting task:", error)
            res.status(500).send("Could not delete task")
        }
    }
}

export default new WebTasksController()