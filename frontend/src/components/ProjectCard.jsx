import { ExternalLink, Eye, MoreVertical, Code2, FolderGit2 } from 'lucide-react'

export default function ProjectCard({ project }) {
  const isDraft = project.status === 'Draft'
  return (
    <div className="rounded-xl border border-white/10 bg-[#13141c] p-4">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white ${project.color}`}>
          <Code2 size={16} />
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className={`h-1.5 w-1.5 rounded-full ${isDraft ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          <span className={isDraft ? 'text-amber-400' : 'text-emerald-400'}>{project.status}</span>
        </div>
      </div>

      <div className="mt-3 text-sm font-medium text-white">{project.name}</div>
      <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{project.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-neutral-300">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <span className="text-[11px] text-neutral-500">{project.date}</span>
        <div className="flex items-center gap-1">
          {project.repoUrl && (
            <button
              onClick={() => window.open(project.repoUrl, '_blank', 'noopener,noreferrer')}
              title="View repo"
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white"
            >
              <FolderGit2 size={14} />
            </button>
          )}
          <button
            disabled={!project.liveUrl}
            onClick={() => project.liveUrl && window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
            title="Open live project"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ExternalLink size={14} />
          </button>
          <button title="Preview" className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white">
            <Eye size={14} />
          </button>
          <button title="More" className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
