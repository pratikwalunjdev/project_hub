import { Router } from 'express'
import { pool } from '../db/pool.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

async function attachTechnologies(projects) {
  if (projects.length === 0) return projects
  const ids = projects.map((p) => p.id)
  const [techRows] = await pool.query(
    `SELECT pt.project_id, t.name
     FROM project_technologies pt
     JOIN technologies t ON t.id = pt.technology_id
     WHERE pt.project_id IN (?)`,
    [ids]
  )
  const byProject = {}
  for (const row of techRows) {
    ;(byProject[row.project_id] ??= []).push(row.name)
  }
  return projects.map((p) => ({ ...p, technologies: byProject[p.id] || [] }))
}

router.get('/', async (req, res) => {
  const { category, status } = req.query
  const conditions = []
  const params = []

  if (category) {
    conditions.push('c.name = ?')
    params.push(category)
  }
  if (status) {
    conditions.push('p.status = ?')
    params.push(status)
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

  const [rows] = await pool.query(
    `SELECT p.id, p.name, p.slug, p.description, p.thumbnail_url AS thumbnailUrl,
            p.live_url AS liveUrl, p.repo_url AS repoUrl, p.status,
            p.created_at AS createdAt, c.name AS category
     FROM projects p
     LEFT JOIN categories c ON c.id = p.category_id
     ${where}
     ORDER BY p.created_at DESC`,
    params
  )

  res.json(await attachTechnologies(rows))
})

router.get('/:id', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT p.id, p.name, p.slug, p.description, p.thumbnail_url AS thumbnailUrl,
            p.live_url AS liveUrl, p.repo_url AS repoUrl, p.status,
            p.created_at AS createdAt, c.name AS category
     FROM projects p
     LEFT JOIN categories c ON c.id = p.category_id
     WHERE p.id = ?`,
    [req.params.id]
  )
  if (rows.length === 0) return res.status(404).json({ error: 'Project not found' })

  const [withTech] = await attachTechnologies(rows)
  res.json(withTech)
})

router.post('/', requireAuth, async (req, res) => {
  const { name, slug, description, thumbnailUrl, liveUrl, repoUrl, category, status, technologies } = req.body

  if (!name?.trim() || !slug?.trim()) {
    return res.status(400).json({ error: 'name and slug are required' })
  }

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    let categoryId = null
    if (category) {
      const [catRows] = await conn.query('SELECT id FROM categories WHERE name = ?', [category])
      categoryId = catRows[0]?.id ?? null
    }

    const [result] = await conn.query(
      `INSERT INTO projects (name, slug, description, thumbnail_url, live_url, repo_url, category_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name.trim(), slug.trim(), description || null, thumbnailUrl || null, liveUrl || null, repoUrl || null, categoryId, status || 'Draft']
    )
    const projectId = result.insertId

    if (Array.isArray(technologies) && technologies.length > 0) {
      const [techRows] = await conn.query('SELECT id, name FROM technologies WHERE name IN (?)', [technologies])
      for (const tech of techRows) {
        await conn.query('INSERT INTO project_technologies (project_id, technology_id) VALUES (?, ?)', [projectId, tech.id])
      }
    }

    await conn.commit()
    res.status(201).json({ id: projectId })
  } catch (err) {
    await conn.rollback()
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'A project with this slug already exists' })
    }
    throw err
  } finally {
    conn.release()
  }
})

router.put('/:id', requireAuth, async (req, res) => {
  const { name, slug, description, thumbnailUrl, liveUrl, repoUrl, category, status, technologies } = req.body
  const conn = await pool.getConnection()

  try {
    await conn.beginTransaction()

    let categoryId = null
    if (category) {
      const [catRows] = await conn.query('SELECT id FROM categories WHERE name = ?', [category])
      categoryId = catRows[0]?.id ?? null
    }

    await conn.query(
      `UPDATE projects
       SET name = ?, slug = ?, description = ?, thumbnail_url = ?, live_url = ?, repo_url = ?, category_id = ?, status = ?
       WHERE id = ?`,
      [name, slug, description || null, thumbnailUrl || null, liveUrl || null, repoUrl || null, categoryId, status, req.params.id]
    )

    if (Array.isArray(technologies)) {
      await conn.query('DELETE FROM project_technologies WHERE project_id = ?', [req.params.id])
      if (technologies.length > 0) {
        const [techRows] = await conn.query('SELECT id, name FROM technologies WHERE name IN (?)', [technologies])
        for (const tech of techRows) {
          await conn.query('INSERT INTO project_technologies (project_id, technology_id) VALUES (?, ?)', [req.params.id, tech.id])
        }
      }
    }

    await conn.commit()
    res.json({ id: Number(req.params.id) })
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
})

router.patch('/:id/status', requireAuth, async (req, res) => {
  const { status } = req.body
  if (!['Draft', 'Published'].includes(status)) {
    return res.status(400).json({ error: 'status must be Draft or Published' })
  }
  await pool.query('UPDATE projects SET status = ? WHERE id = ?', [status, req.params.id])
  res.json({ id: Number(req.params.id), status })
})

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id])
  res.status(204).end()
})

export default router
