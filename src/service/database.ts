import { Database } from 'bun:sqlite'

export const useDatabase = () => {
  const db = new Database('./db.sqlite')
  return { db }
}
