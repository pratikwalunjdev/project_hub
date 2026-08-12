import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { visitorsSeries } from '../data/mockData'

export default function VisitorsChart() {
  const total = visitorsSeries.reduce((sum, d) => sum + d.visitors, 0)

  return (
    <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Visitors Overview</h3>
        <select className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-neutral-300">
          <option>This Month</option>
        </select>
      </div>

      <div className="mt-2 text-2xl font-semibold text-white">
        {visitorsSeries[visitorsSeries.length - 1].visitors.toLocaleString()}
      </div>
      <div className="text-xs text-neutral-500">Total Visitors</div>

      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={visitorsSeries}>
            <CartesianGrid stroke="#2a2b38" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#1c1d27', border: '1px solid #2a2b38', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#e5e7eb' }}
            />
            <Line type="monotone" dataKey="visitors" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
