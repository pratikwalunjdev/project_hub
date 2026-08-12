import { Router } from 'express'
import { pool } from '../db/pool.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id, page, session_id AS sessionId, referrer, device, location,
            duration_seconds AS durationSeconds, created_at AS createdAt
     FROM page_views ORDER BY created_at DESC LIMIT 200`
  )
  res.json(rows)
})

router.get('/summary', requireAuth, async (req, res) => {
  const [[totals]] = await pool.query(
    `SELECT COUNT(*) AS pageViews, COUNT(DISTINCT session_id) AS totalVisitors,
            AVG(duration_seconds) AS avgDurationSeconds
     FROM page_views`
  )
  const [byDay] = await pool.query(
    `SELECT DATE(created_at) AS day, COUNT(DISTINCT session_id) AS visitors
     FROM page_views
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
     GROUP BY DATE(created_at)
     ORDER BY day`
  )
  res.json({ ...totals, byDay })
})

router.post('/', async (req, res) => {
  const { page, sessionId, referrer, device, location, durationSeconds } = req.body
  if (!page) return res.status(400).json({ error: 'page is required' })

  await pool.query(
    `INSERT INTO page_views (page, session_id, referrer, device, location, duration_seconds)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [page, sessionId || null, referrer || null, device || null, location || null, durationSeconds || null]
  )
  res.status(201).end()
})

export default router
