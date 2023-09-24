import { Database } from 'bun:sqlite'

export const createDatabase = () => {
  const db = new Database('./data/app.db')
  return { db }
}
