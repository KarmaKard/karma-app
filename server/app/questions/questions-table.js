import r from '../database'

export async function index() {
  return r.table('questions').run()
}