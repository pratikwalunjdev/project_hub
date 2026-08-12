import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { techStack } from '../data/mockData'

export default function TechStackChart() {
  const total = techStack.reduce((sum, t) => sum + t.value, 0)

  return (
    <div className="rounded-xl border border-white/10 bg-[#13141c] p-5">
      <h3 className="text-sm font-medium text-white">Tech Stack Overview</h3>

      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={techStack}
                dataKey="value"
                nameKey="name"
                innerRadius={38}
                outerRadius={58}
                paddingAngle={2}
              >
                {techStack.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-neutral-500">Total</span>
            <span className="text-lg font-semibold text-white">{total}</span>
          </div>
        </div>

        <ul className="flex-1 space-y-1.5">
          {techStack.map((t) => (
            <li key={t.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-neutral-300">
                <span className="h-2 w-2 rounded-full" style={{ background: t.color }} />
                {t.name}
              </span>
              <span className="text-neutral-500">
                {t.value} ({Math.round((t.value / total) * 100)}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
