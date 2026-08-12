import { Router } from 'express'
import { pool } from '../db/pool.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT c.id, c.name, COUNT(p.id) AS projectCount
     FROM categories c
     LEFT JOIN projects p ON p.category_id = c.id
     GROUP BY c.id
     ORDER BY c.name`
  )
  res.json(rows)
})

router.post('/', requireAuth, async (req, res) => {
  const { name } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'name is required' })

  const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name.trim()])
  res.status(201).json({ id: result.insertId, name: name.trim() })
})

router.put('/:id', requireAuth, async (req, res) => {
  const { name } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'name is required' })

  await pool.query('UPDATE categories SET name = ? WHERE id = ?', [name.trim(), req.params.id])
  res.json({ id: Number(req.params.id), name: name.trim() })
})

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id])
  res.status(204).end()
})

export default router
