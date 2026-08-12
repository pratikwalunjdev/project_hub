import { useState } from 'react'
import { Plus, Pencil, Trash2, LayoutGrid } from 'lucide-react'
import { categories as initialCategories, projects } from '../data/mockData'

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories)
  const [newCategory, setNewCategory] = useState('')
  const [editing, setEditing] = useState(null)
  const [editValue, setEditValue] = useState('')

  function countFor(cat) {
    return projects.filter((p) => p.category === cat).length
  }

  function addCategory(e) {
    e.preventDefault()
    const name = newCategory.trim()
    if (!name || categories.includes(name)) return
    setCategories((prev) => [...prev, name])
    setNewCategory('')
  }

  function removeCategory(cat) {
    setCategories((prev) => prev.filter((c) => c !== cat))
  }

  function startEdit(cat) {
    setEditing(cat)
    setEditValue(cat)
  }

  function saveEdit(oldName) {
    const name = editValue.trim()
    if (!name) return
    setCategories((prev) => prev.map((c) => (c === oldName ? name : c)))
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Categories</h1>
        <p className="mt-1 text-sm text-neutral-500">Organize your projects into categories.</p>
      </div>

      <form onSubmit={addCategory} className="flex gap-2">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name..."
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
        {categories.map((cat) => (
          <div key={cat} className="rounded-xl border border-white/10 bg-[#13141c] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400">
                <LayoutGrid size={18} />
              </div>
              <div className="min-w-0 flex-1">
                {editing === cat ? (
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => saveEdit(cat)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(cat)}
                    className="w-full rounded-md border border-violet-500 bg-white/5 px-2 py-1 text-sm text-white focus:outline-none"
                  />
                ) : (
                  <div className="text-sm font-medium text-white">{cat}</div>
                )}
                <div className="text-xs text-neutral-500">{countFor(cat)} projects</div>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-1 border-t border-white/5 pt-3">
              <button
                onClick={() => startEdit(cat)}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => removeCategory(cat)}
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
