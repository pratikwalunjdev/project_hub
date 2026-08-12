import { Monitor, Smartphone, Tablet } from 'lucide-react'
import { visitorLogs, stats } from '../data/mockData'
import StatCard from '../components/StatCard'

const deviceIcons = { Desktop: Monitor, Mobile: Smartphone, Tablet: Tablet }

export default function Visitors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Visitors</h1>
        <p className="mt-1 text-sm text-neutral-500">Recent visitor sessions across your site.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#13141c]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs text-neutral-500">
              <th className="px-4 py-3 font-medium">Page</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Device</th>
              <th className="px-4 py-3 font-medium">Referrer</th>
              <th className="px-4 py-3 font-medium">Duration</th>
              <th className="px-4 py-3 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {visitorLogs.map((v) => {
              const DeviceIcon = deviceIcons[v.device]
              return (
                <tr key={v.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white">{v.page}</td>
                  <td className="px-4 py-3 text-neutral-400">{v.location}</td>
                  <td className="px-4 py-3 text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <DeviceIcon size={14} />
                      {v.device}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-400">{v.referrer}</td>
                  <td className="px-4 py-3 text-neutral-400">{v.duration}</td>
                  <td className="px-4 py-3 text-neutral-500">{v.time}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
