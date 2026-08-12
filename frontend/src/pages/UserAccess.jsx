import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'

export default function UserAccess() {
  const [form, setForm] = useState({ name: 'Pratik Walunj', email: 'pratik.walunj.dev@gmail.com' })
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [saved, setSaved] = useState(false)
  const [pwError, setPwError] = useState('')

  function handleProfileSubmit(e) {
    e.preventDefault()
    setSaved(true)
  }

  function handlePwSubmit(e) {
    e.preventDefault()
    if (pwForm.next !== pwForm.confirm) {
      setPwError('New password and confirmation do not match.')
      return
    }
    setPwError('')
    setPwForm({ current: '', next: '', confirm: '' })
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">User Access</h1>
        <p className="mt-1 text-sm text-neutral-500">
          You're the only admin on this site — manage your account here.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-violet-500/30 bg-violet-600/10 p-4">
        <ShieldCheck size={18} className="text-violet-400" />
        <span className="text-sm text-neutral-300">Single-admin mode is enabled. No other users can be added.</span>
      </div>

      <form onSubmit={handleProfileSubmit} className="space-y-4 rounded-xl border border-white/10 bg-[#13141c] p-5">
        <h3 className="text-sm font-medium text-white">Profile</h3>
        <div>
          <label className="mb-1 block text-xs text-neutral-400">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-neutral-400">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500">
            Save Profile
          </button>
          {saved && <span className="text-xs text-emerald-400">Saved</span>}
        </div>
      </form>

      <form onSubmit={handlePwSubmit} className="space-y-4 rounded-xl border border-white/10 bg-[#13141c] p-5">
        <h3 className="text-sm font-medium text-white">Change Password</h3>
        <div>
          <label className="mb-1 block text-xs text-neutral-400">Current Password</label>
          <input
            type="password"
            value={pwForm.current}
            onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-neutral-400">New Password</label>
            <input
              type="password"
              value={pwForm.next}
              onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-neutral-400">Confirm New Password</label>
            <input
              type="password"
              value={pwForm.confirm}
              onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-violet-500 focus:outline-none"
            />
          </div>
        </div>
        {pwError && <p className="text-xs text-red-400">{pwError}</p>}
        <button type="submit" className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500">
          Update Password
        </button>
      </form>
    </div>
  )
}
