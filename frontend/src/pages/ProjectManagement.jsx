import { useState } from 'react'
import { Pencil, Trash2, ExternalLink, Plus } from 'lucide-react'
import { projects as initialProjects } from '../data/mockData'
import NewProjectModal from '../components/NewProjectModal'

export default function ProjectManagement() {
  const [projects, setProjects] = useState(initialProjects)
  const [modalOpen, setModalOpen] = useState(false)

  function toggleStatus(id) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Published' ? 'Draft' : 'Published' } : p
      )
    )
  }

  function removeProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  function handleCreate(form) {
    setProjects((prev) => [
      {
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
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
          <h1 className="text-2xl font-semibold text-white">Project Management</h1>
          <p className="mt-1 text-sm text-neutral-500">Full control over every project on your site.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#13141c]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs text-neutral-500">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 text-white">{p.name}</td>
                <td className="px-4 py-3 text-neutral-400">{p.category}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(p.id)}
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      p.status === 'Published'
                        ? 'bg-emerald-600/20 text-emerald-400'
                        : 'bg-amber-600/20 text-amber-400'
                    }`}
                  >
                    {p.status}
                  </button>
                </td>
                <td className="px-4 py-3 text-neutral-400">{p.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      disabled={!p.liveUrl}
                      onClick={() => p.liveUrl && window.open(p.liveUrl, '_blank', 'noopener,noreferrer')}
                      className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
                    >
                      <ExternalLink size={14} />
                    </button>
                    <button className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white">
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => removeProject(p.id)}
                      className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} />
    </div>
  )
}
