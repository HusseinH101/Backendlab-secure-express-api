import db from "../service/DatabaseService.js"

// Model that handles database operations for users
class UsersModel {

    // Find a user by username
    async findByUsername(username) {
        const sql = "SELECT * FROM users WHERE username = ?"
        const rows = await db.query(sql, [username])

        return rows[0]
    }

    // Create a new user
    async createUser(username, password) {
        const sql = `
            INSERT INTO users (username, password)
            VALUES (?, ?)
        `
        return await db.query(sql, [username, password])
    }
}

export default new UsersModel()