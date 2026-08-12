import { Plus, Crown, LayoutList, LayoutGrid as GridIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import ProjectRow from '../components/ProjectRow'
import VisitorsChart from '../components/VisitorsChart'
import TechStackChart from '../components/TechStackChart'
import { stats, projects } from '../data/mockData'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Welcome back, Pratik! 👋</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Here's an overview of your projects and website performance.
          </p>
        </div>
        <Link
          to="/projects"
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#13141c] p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">My Projects</h3>
            <div className="flex items-center gap-2">
              <select className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-neutral-300">
                <option>All Categories</option>
              </select>
              <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
                <button className="rounded-md bg-violet-600 p-1.5 text-white">
                  <LayoutList size={14} />
                </button>
                <button className="rounded-md p-1.5 text-neutral-400">
                  <GridIcon size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-2">
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} />
            ))}
          </div>

          <Link
            to="/projects"
            className="mt-3 block w-full rounded-lg py-2 text-center text-sm text-violet-400 hover:bg-white/5"
          >
            View All Projects →
          </Link>
        </div>

        <div className="space-y-6">
          <VisitorsChart />
          <TechStackChart />

          <div className="rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 p-5">
            <Crown size={20} className="text-amber-400" />
            <h3 className="mt-2 text-sm font-medium text-white">This is Your Space</h3>
            <p className="mt-1 text-xs text-neutral-400">
              You're the only admin. Manage everything from here and showcase your work to the world.
            </p>
            <button className="mt-3 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-500">
              Go to Admin Panel →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
