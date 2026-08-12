import { ExternalLink, Eye, MoreVertical, Code2 } from 'lucide-react'

export default function ProjectRow({ project }) {
  const isDraft = project.status === 'Draft'
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-3 last:border-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${project.color}`}>
          <Code2 size={16} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-white">{project.name}</div>
          <div className="truncate text-xs text-neutral-500">{project.description}</div>
        </div>
      </div>

      <div className="hidden shrink-0 gap-2 md:flex">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="hidden w-28 shrink-0 items-center gap-1.5 text-xs sm:flex">
        <span className={`h-1.5 w-1.5 rounded-full ${isDraft ? 'bg-amber-400' : 'bg-emerald-400'}`} />
        <span className={isDraft ? 'text-amber-400' : 'text-emerald-400'}>{project.status}</span>
      </div>

      <div className="hidden w-24 shrink-0 text-xs text-neutral-500 lg:block">{project.date}</div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          disabled={!project.liveUrl}
          onClick={() => project.liveUrl && window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
          title="Open live project"
          className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ExternalLink size={16} />
        </button>
        <button title="Preview" className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 hover:text-white">
          <Eye size={16} />
        </button>
        <button title="More" className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 hover:text-white">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  )
}
