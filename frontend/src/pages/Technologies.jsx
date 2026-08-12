import { useState } from 'react'
import { Plus, Pencil, Trash2, Wrench } from 'lucide-react'
import { technologyList as initialTech, projects } from '../data/mockData'

export default function Technologies() {
  const [technologies, setTechnologies] = useState(initialTech)
  const [newTech, setNewTech] = useState('')
  const [editing, setEditing] = useState(null)
  const [editValue, setEditValue] = useState('')

  function countFor(tech) {
    return projects.filter((p) => p.technologies?.includes(tech)).length
  }

  function addTech(e) {
    e.preventDefault()
    const name = newTech.trim()
    if (!name || technologies.includes(name)) return
    setTechnologies((prev) => [...prev, name])
    setNewTech('')
  }

  function removeTech(tech) {
    setTechnologies((prev) => prev.filter((t) => t !== tech))
  }

  function startEdit(tech) {
    setEditing(tech)
    setEditValue(tech)
  }

  function saveEdit(oldName) {
    const name = editValue.trim()
    if (!name) return
    setTechnologies((prev) => prev.map((t) => (t === oldName ? name : t)))
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Technologies</h1>
        <p className="mt-1 text-sm text-neutral-500">Manage the tech stack tags used across your projects.</p>
      </div>

      <form onSubmit={addTech} className="flex gap-2">
        <input
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
          placeholder="New technology name..."
          className="w-full max-w-sm rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-violet-500 focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          <Plus size={16} />
          Add
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => (
          <div key={tech} className="rounded-xl border border-white/10 bg-[#13141c] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400">
                <Wrench size={18} />
              </div>
              <div className="min-w-0 flex-1">
                {editing === tech ? (
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => saveEdit(tech)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(tech)}
                    className="w-full rounded-md border border-violet-500 bg-white/5 px-2 py-1 text-sm text-white focus:outline-none"
                  />
                ) : (
                  <div className="text-sm font-medium text-white">{tech}</div>
                )}
                <div className="text-xs text-neutral-500">{countFor(tech)} projects</div>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-1 border-t border-white/5 pt-3">
              <button
                onClick={() => startEdit(tech)}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => removeTech(tech)}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
