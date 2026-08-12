import { useState } from 'react'

const fields = [
  { key: 'siteName', label: 'Site Name', placeholder: "Pratik's Hub" },
  { key: 'tagline', label: 'Tagline', placeholder: 'My Projects. My World.' },
  { key: 'metaDescription', label: 'Meta Description', placeholder: 'A showcase of my personal software projects.', textarea: true },
  { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/pratikwalunj' },
  { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/pratikwalunj' },
  { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/pratikwalunj' },
]

export default function SiteSettings() {
  const [form, setForm] = useState({})
  const [saved, setSaved] = useState(false)

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSaved(true)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Site Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Controls how your portfolio site appears to visitors.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/10 bg-[#13141c] p-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-xs text-neutral-400">{f.label}</label>
            {f.textarea ? (
              <textarea
                rows={3}
                value={form[f.key] || ''}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-violet-500 focus:outline-none"
              />
            ) : (
              <input
                value={form[f.key] || ''}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-violet-500 focus:outline-none"
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
          >
            Save Changes
          </button>
          {saved && <span className="text-xs text-emerald-400">Saved</span>}
        </div>
      </form>
    </div>
  )
}
