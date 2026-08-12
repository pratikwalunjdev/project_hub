import { Search, Sun, Bell, ChevronDown } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-6">
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
        <Search size={16} className="text-neutral-500" />
        <input
          type="text"
          placeholder="Search projects, technologies, categories..."
          className="w-full bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none"
        />
        <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-neutral-500">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 hover:text-white">
          <Sun size={18} />
        </button>
        <button className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 hover:text-white">
          <Bell size={18} />
        </button>
        <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-white/5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
          <ChevronDown size={16} className="text-neutral-400" />
        </button>
      </div>
    </header>
  )
}
