import { createDatabase } from '~/service/database'

const { db } = createDatabase()
db.run(`CREATE TABLE IF NOT EXISTS messages(message TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`)
