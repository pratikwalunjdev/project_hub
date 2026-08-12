import { Folder, Eye, TrendingUp, Smile } from 'lucide-react'

const icons = { folder: Folder, eye: Eye, 'trending-up': TrendingUp, smile: Smile }
const bgColors = {
  folder: 'bg-violet-600/20 text-violet-400',
  eye: 'bg-sky-600/20 text-sky-400',
  'trending-up': 'bg-emerald-600/20 text-emerald-400',
  smile: 'bg-orange-600/20 text-orange-400',
}

export default function StatCard({ label, value, change, icon }) {
  const Icon = icons[icon]
  return (
    <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColors[icon]}`}>
          <Icon size={18} />
        </div>
        <span className="text-sm text-neutral-400">{label}</span>
      </div>
      <div className="mt-3 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-emerald-400">
        ↑ {change} <span className="text-neutral-500">from last month</span>
      </div>
    </div>
  )
}
