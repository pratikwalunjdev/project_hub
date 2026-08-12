import { useMemo, useState } from 'react'
import { Plus, Search, LayoutList, LayoutGrid as GridIcon } from 'lucide-react'
import ProjectRow from '../components/ProjectRow'
import ProjectCard from '../components/ProjectCard'
import NewProjectModal from '../components/NewProjectModal'
import { projects as initialProjects, categories } from '../data/mockData'

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects)
  const [view, setView] = useState('list')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || p.category === category
      const matchesStatus = status === 'All' || p.status === status
      return matchesQuery && matchesCategory && matchesStatus
    })
  }, [projects, query, category, status])

  function handleCreate(form) {
    setProjects((prev) => [
      {
        id: prev.length + 1,
        name: form.name,
        description: form.description,
        tags: [form.category],
        category: form.category,
        technologies: form.technologies,
        status: form.status,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        liveUrl: form.liveUrl || null,
        repoUrl: form.repoUrl || null,
        color: 'bg-violet-600',
      },
      ...prev,
    ])
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {filtered.length} of {projects.length} projects
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <Search size={16} className="text-neutral-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300"
        >
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>

        <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
          <button
            onClick={() => setView('list')}
            className={`rounded-md p-1.5 ${view === 'list' ? 'bg-violet-600 text-white' : 'text-neutral-400'}`}
          >
            <LayoutList size={14} />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`rounded-md p-1.5 ${view === 'grid' ? 'bg-violet-600 text-white' : 'text-neutral-400'}`}
          >
            <GridIcon size={14} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#13141c] p-10 text-center text-sm text-neutral-500">
          No projects match your filters.
        </div>
      ) : view === 'list' ? (
        <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
          {filtered.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />
    </div>
  )
}
