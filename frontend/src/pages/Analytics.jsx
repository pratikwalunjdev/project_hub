import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import StatCard from '../components/StatCard'
import VisitorsChart from '../components/VisitorsChart'
import { stats, referrers, topProjectsByViews } from '../data/mockData'

export default function Analytics() {
  const totalReferrerVisits = referrers.reduce((sum, r) => sum + r.visits, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-neutral-500">Deeper look at how visitors find and use your site.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <VisitorsChart />

        <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
          <h3 className="text-sm font-medium text-white">Top Projects by Views</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProjectsByViews} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid stroke="#2a2b38" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{ background: '#1c1d27', border: '1px solid #2a2b38', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#e5e7eb' }}
                  cursor={{ fill: 'rgba(124,58,237,0.08)' }}
                />
                <Bar dataKey="views" fill="#7c3aed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
        <h3 className="text-sm font-medium text-white">Traffic by Referrer</h3>
        <div className="mt-4 space-y-3">
          {referrers.map((r) => {
            const pct = Math.round((r.visits / totalReferrerVisits) * 100)
            return (
              <div key={r.source}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-neutral-300">{r.source}</span>
                  <span className="text-neutral-500">{r.visits.toLocaleString()} ({pct}%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/5">
                  <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: r.color }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
