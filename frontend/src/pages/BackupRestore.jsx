import { useRef, useState } from 'react'
import { Download, Upload, DatabaseBackup } from 'lucide-react'
import { projects, categories, technologyList } from '../data/mockData'

export default function BackupRestore() {
  const fileRef = useRef(null)
  const [importedName, setImportedName] = useState('')

  function handleExport() {
    const payload = { projects, categories, technologies: technologyList, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pratiks-hub-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportClick() {
    fileRef.current?.click()
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) setImportedName(file.name)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Backup & Restore</h1>
        <p className="mt-1 text-sm text-neutral-500">Export your project data as a snapshot, or restore from one.</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400">
            <DatabaseBackup size={18} />
          </div>
          <div>
            <div className="text-sm font-medium text-white">Export Data</div>
            <div className="text-xs text-neutral-500">Download all projects, categories and technologies as JSON.</div>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="mt-4 flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          <Download size={16} />
          Export Backup
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600/20 text-sky-400">
            <Upload size={18} />
          </div>
          <div>
            <div className="text-sm font-medium text-white">Restore Data</div>
            <div className="text-xs text-neutral-500">Upload a previously exported JSON backup file.</div>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="application/json" onChange={handleFileChange} className="hidden" />
        <button
          onClick={handleImportClick}
          className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-300 hover:bg-white/10"
        >
          <Upload size={16} />
          Choose File
        </button>
        {importedName && (
          <p className="mt-2 text-xs text-emerald-400">Selected: {importedName} (restore not yet wired to backend)</p>
        )}
      </div>
    </div>
  )
}
