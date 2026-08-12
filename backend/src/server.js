import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import authRoutes from './routes/auth.js'
import projectRoutes from './routes/projects.js'
import categoryRoutes from './routes/categories.js'
import technologyRoutes from './routes/technologies.js'
import messageRoutes from './routes/messages.js'
import visitorRoutes from './routes/visitors.js'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/technologies', technologyRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/visitors', visitorRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
