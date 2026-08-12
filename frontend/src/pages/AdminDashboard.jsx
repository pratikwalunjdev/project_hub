import { Link } from 'react-router-dom'
import { FolderCog, SlidersHorizontal, UserCog, DatabaseBackup } from 'lucide-react'
import StatCard from '../components/StatCard'
import { stats, projects } from '../data/mockData'

const shortcuts = [
  { to: '/admin/projects', label: 'Project Management', desc: 'Add, edit, publish or archive projects', icon: FolderCog },
  { to: '/admin/site-settings', label: 'Site Settings', desc: 'Site name, meta tags, social links', icon: SlidersHorizontal },
  { to: '/admin/access', label: 'User Access', desc: 'Manage your admin account & password', icon: UserCog },
  { to: '/admin/backup', label: 'Backup & Restore', desc: 'Export or import your project data', icon: DatabaseBackup },
]

export default function AdminDashboard() {
  const published = projects.filter((p) => p.status === 'Published').length
  const draft = projects.filter((p) => p.status === 'Draft').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">Site-wide controls and shortcuts, only visible to you.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#13141c] p-4 text-center">
          <div className="text-xl font-semibold text-emerald-400">{published}</div>
          <div className="text-xs text-neutral-500">Published</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#13141c] p-4 text-center">
          <div className="text-xl font-semibold text-amber-400">{draft}</div>
          <div className="text-xs text-neutral-500">Draft</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#13141c] p-4 text-center">
          <div className="text-xl font-semibold text-white">{projects.length}</div>
          <div className="text-xs text-neutral-500">Total</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#13141c] p-4 text-center">
          <div className="text-xl font-semibold text-white">1</div>
          <div className="text-xs text-neutral-500">Admin</div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-white">Admin shortcuts</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shortcuts.map(({ to, label, desc, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="rounded-xl border border-white/10 bg-[#13141c] p-4 hover:border-violet-500/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400">
                <Icon size={18} />
              </div>
              <div className="mt-3 text-sm font-medium text-white">{label}</div>
              <div className="mt-1 text-xs text-neutral-500">{desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
