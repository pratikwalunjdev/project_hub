import { Router } from 'express'
import { pool } from '../db/pool.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT t.id, t.name, COUNT(pt.project_id) AS projectCount
     FROM technologies t
     LEFT JOIN project_technologies pt ON pt.technology_id = t.id
     GROUP BY t.id
     ORDER BY t.name`
  )
  res.json(rows)
})

router.post('/', requireAuth, async (req, res) => {
  const { name } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'name is required' })

  const [result] = await pool.query('INSERT INTO technologies (name) VALUES (?)', [name.trim()])
  res.status(201).json({ id: result.insertId, name: name.trim() })
})

router.put('/:id', requireAuth, async (req, res) => {
  const { name } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'name is required' })

  await pool.query('UPDATE technologies SET name = ? WHERE id = ?', [name.trim(), req.params.id])
  res.json({ id: Number(req.params.id), name: name.trim() })
})

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM technologies WHERE id = ?', [req.params.id])
  res.status(204).end()
})

export default router
