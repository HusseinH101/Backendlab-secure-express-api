import dotenv from "dotenv"
dotenv.config()

import mysql from "mysql2/promise"

// Database service that creates a connection pool for MySQL
class DatabaseService {
    constructor() {
        // Create a reusable pool using values from .env
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10
        })
    }

    // Run a SQL query with optional parameters
    async query(sql, params = []) {
        const [rows] = await this.pool.execute(sql, params)
        return rows
    }
}

// Export one shared database service instance
export default new DatabaseService()