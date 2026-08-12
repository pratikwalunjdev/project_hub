import { useState } from 'react'
import { X } from 'lucide-react'
import { categories, technologyList } from '../data/mockData'

const emptyForm = {
  name: '',
  slug: '',
  description: '',
  thumbnailUrl: '',
  liveUrl: '',
  repoUrl: '',
  category: categories[0],
  technologies: [],
  status: 'Draft',
}

export default function NewProjectModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(emptyForm)

  if (!open) return null

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function toggleTech(tech) {
    setForm((f) => ({
      ...f,
      technologies: f.technologies.includes(tech)
        ? f.technologies.filter((t) => t !== tech)
        : [...f.technologies, tech],
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onCreate(form)
    setForm(emptyForm)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-white/10 bg-[#13141c] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">New Project</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs text-neutral-400">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
              placeholder="ZenithOS"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-neutral-400">Slug</label>
            <input
              required
              value={form.slug}
              onChange={(e) => update('slug', e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
              placeholder="zenithos"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-neutral-400">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
              placeholder="Short description of the project"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-neutral-400">Live URL</label>
              <input
                type="url"
                value={form.liveUrl}
                onChange={(e) => update('liveUrl', e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-neutral-400">Repo URL</label>
              <input
                type="url"
                value={form.repoUrl}
                onChange={(e) => update('repoUrl', e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-neutral-400">Thumbnail URL</label>
            <input
              value={form.thumbnailUrl}
              onChange={(e) => update('thumbnailUrl', e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-neutral-400">Category</label>
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-neutral-400">Status</label>
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
              >
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-neutral-400">Technologies</label>
            <div className="flex flex-wrap gap-1.5">
              {technologyList.map((tech) => {
                const active = form.technologies.includes(tech)
                return (
                  <button
                    type="button"
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      active ? 'bg-violet-600 text-white' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {tech}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-neutral-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
