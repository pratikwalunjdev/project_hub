import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Folder,
  LayoutGrid,
  Wrench,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  ShieldCheck,
  FolderCog,
  SlidersHorizontal,
  UserCog,
  DatabaseBackup,
  Code2,
} from 'lucide-react'

const mainNav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: Folder },
  { to: '/categories', label: 'Categories', icon: LayoutGrid },
  { to: '/technologies', label: 'Technologies', icon: Wrench },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/visitors', label: 'Visitors', icon: Users },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const adminNav = [
  { to: '/admin', label: 'Admin Dashboard', icon: ShieldCheck },
  { to: '/admin/projects', label: 'Project Management', icon: FolderCog },
  { to: '/admin/site-settings', label: 'Site Settings', icon: SlidersHorizontal },
  { to: '/admin/access', label: 'User Access', icon: UserCog },
  { to: '/admin/backup', label: 'Backup & Restore', icon: DatabaseBackup },
]

function NavItem({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      end={to === '/' || to === '/admin'}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
          isActive
            ? 'bg-violet-600/15 text-violet-300'
            : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#0f1017] p-4">
      <div className="mb-6 flex items-center gap-2 px-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
          <Code2 size={18} className="text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Pratik's Hub</div>
          <div className="text-xs text-neutral-500">My Projects. My World.</div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {mainNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        <div className="mt-6 mb-2 px-3 text-xs font-semibold tracking-wider text-violet-400/80">
          ADMIN PANEL
        </div>
        {adminNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      <div className="mt-4 rounded-xl bg-white/5 p-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
          <div>
            <div className="text-sm font-medium text-white">Pratik Walunj</div>
            <div className="text-xs text-neutral-500">Administrator</div>
          </div>
        </div>
        <NavLink
          to="/profile"
          className="mt-3 block rounded-lg bg-white/5 px-3 py-1.5 text-center text-xs text-neutral-300 hover:bg-white/10"
        >
          View My Profile
        </NavLink>
      </div>
    </aside>
  )
}
