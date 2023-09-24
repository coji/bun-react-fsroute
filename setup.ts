import { createDatabase } from '~/service/database'

const { db } = createDatabase()
db.run(`CREATE TABLE IF NOT EXISTS messages(message TEXT)`)
