// Import the database service that handles MySQL queries
import db from "../service/DatabaseService.js"

// The model handles all database operations related to tasks
class TasksModel {

    // Get all tasks from the database
    async getAllTasks() {
        const sql = "SELECT * FROM tasks"
        return await db.query(sql)
    }

    // Get one task by its id
    async getTaskById(id) {
        const sql = "SELECT * FROM tasks WHERE id = ?"
        const rows = await db.query(sql, [id])

        // Return the first matching row
        return rows[0]
    }

    // Create a new task
    async createTask(title, description, status) {
        const sql = `
            INSERT INTO tasks (title, description, status)
            VALUES (?, ?, ?)
        `

        const result = await db.query(sql, [title, description, status])

        // Return the newly created task id
        return result.insertId
    }

    // Update an existing task
    async updateTask(id, title, description, status) {
        const sql = `
            UPDATE tasks
            SET title = ?, description = ?, status = ?
            WHERE id = ?
        `

        return await db.query(sql, [title, description, status, id])
    }

    // Delete a task by id
    async deleteTask(id) {
        const sql = "DELETE FROM tasks WHERE id = ?"
        return await db.query(sql, [id])
    }
}

// Export one instance of the model
export default new TasksModel()