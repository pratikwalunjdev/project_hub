import { useState } from 'react'
import { Moon, Sun, Bell } from 'lucide-react'

export default function Settings() {
  const [theme, setTheme] = useState('dark')
  const [notifications, setNotifications] = useState({ newMessage: true, weeklyDigest: false })

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Personal preferences for your dashboard.</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
        <h3 className="text-sm font-medium text-white">Appearance</h3>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setTheme('light')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm ${
              theme === 'light' ? 'border-violet-500 bg-violet-600/10 text-white' : 'border-white/10 text-neutral-400'
            }`}
          >
            <Sun size={16} />
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm ${
              theme === 'dark' ? 'border-violet-500 bg-violet-600/10 text-white' : 'border-white/10 text-neutral-400'
            }`}
          >
            <Moon size={16} />
            Dark
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
        <h3 className="flex items-center gap-2 text-sm font-medium text-white">
          <Bell size={16} />
          Notifications
        </h3>
        <div className="mt-3 space-y-3">
          <label className="flex items-center justify-between text-sm text-neutral-300">
            New message alerts
            <input
              type="checkbox"
              checked={notifications.newMessage}
              onChange={(e) => setNotifications((n) => ({ ...n, newMessage: e.target.checked }))}
              className="h-4 w-4 accent-violet-600"
            />
          </label>
          <label className="flex items-center justify-between text-sm text-neutral-300">
            Weekly analytics digest
            <input
              type="checkbox"
              checked={notifications.weeklyDigest}
              onChange={(e) => setNotifications((n) => ({ ...n, weeklyDigest: e.target.checked }))}
              className="h-4 w-4 accent-violet-600"
            />
          </label>
        </div>
      </div>
    </div>
  )
}
