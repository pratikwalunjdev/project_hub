import { useState } from 'react'
import { Mail, MailOpen, Trash2 } from 'lucide-react'
import { messages as initialMessages } from '../data/mockData'

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages)
  const [selectedId, setSelectedId] = useState(initialMessages[0]?.id ?? null)

  const selected = messages.find((m) => m.id === selectedId)

  function openMessage(id) {
    setSelectedId(id)
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }

  function removeMessage(id) {
    setMessages((prev) => prev.filter((m) => m.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Messages</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="rounded-xl border border-white/10 bg-[#13141c] lg:col-span-2">
          {messages.length === 0 ? (
            <div className="p-6 text-center text-sm text-neutral-500">No messages.</div>
          ) : (
            messages.map((m) => (
              <button
                key={m.id}
                onClick={() => openMessage(m.id)}
                className={`flex w-full items-start gap-3 border-b border-white/5 p-4 text-left last:border-0 hover:bg-white/5 ${
                  selectedId === m.id ? 'bg-white/5' : ''
                }`}
              >
                {m.read ? (
                  <MailOpen size={16} className="mt-0.5 shrink-0 text-neutral-500" />
                ) : (
                  <Mail size={16} className="mt-0.5 shrink-0 text-violet-400" />
                )}
                <div className="min-w-0">
                  <div className={`text-sm ${m.read ? 'text-neutral-300' : 'font-medium text-white'}`}>{m.name}</div>
                  <div className="truncate text-xs text-neutral-500">{m.subject}</div>
                  <div className="mt-0.5 text-[11px] text-neutral-600">{m.time}</div>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-[#13141c] p-5 lg:col-span-3">
          {selected ? (
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-medium text-white">{selected.subject}</h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    {selected.name} &lt;{selected.email}&gt; · {selected.time}
                  </p>
                </div>
                <button
                  onClick={() => removeMessage(selected.id)}
                  className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">{selected.body}</p>
              <a
                href={`mailto:${selected.email}`}
                className="mt-4 inline-block rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
              >
                Reply via Email
              </a>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-500">
              Select a message to read it.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
