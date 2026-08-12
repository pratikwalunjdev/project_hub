export default function Placeholder({ title }) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-xl font-semibold text-white">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-neutral-500">
        This page is scaffolded and ready to be built out next.
      </p>
    </div>
  )
}
