import { Router } from 'express'
import { pool } from '../db/pool.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id, name, email, subject, body, is_read AS isRead, created_at AS createdAt
     FROM messages ORDER BY created_at DESC`
  )
  res.json(rows)
})

router.post('/', async (req, res) => {
  const { name, email, subject, body } = req.body
  if (!name?.trim() || !email?.trim() || !body?.trim()) {
    return res.status(400).json({ error: 'name, email and body are required' })
  }

  const [result] = await pool.query(
    'INSERT INTO messages (name, email, subject, body) VALUES (?, ?, ?, ?)',
    [name.trim(), email.trim(), subject?.trim() || null, body.trim()]
  )
  res.status(201).json({ id: result.insertId })
})

router.patch('/:id/read', requireAuth, async (req, res) => {
  await pool.query('UPDATE messages SET is_read = TRUE WHERE id = ?', [req.params.id])
  res.json({ id: Number(req.params.id), isRead: true })
})

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM messages WHERE id = ?', [req.params.id])
  res.status(204).end()
})

export default router
