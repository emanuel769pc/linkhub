import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TEMPLATES } from '../../lib/templates'
import { MiniPreview } from '../admin/editor/MiniPreview'

// Galería para explorar todas las plantillas con vista previa a tamaño real.

export function GalleryPage() {
  useEffect(() => {
    document.title = 'Galería de plantillas — LinkHub'
  }, [])

  return (
    <div className="min-h-full bg-paper pb-20">
      <header className="sticky top-0 z-20 border-b border-line bg-panel/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
          <Link
            to="/"
            className="rounded-lg px-2.5 py-1.5 text-[13px] font-semibold text-ink-soft transition hover:bg-paper hover:text-ink"
          >
            ← Inicio
          </Link>
          <div className="min-w-0">
            <h1 className="font-display text-[15px] font-bold tracking-tight text-ink">
              Galería de plantillas
            </h1>
            <p className="truncate text-xs text-mute">
              {TEMPLATES.length} estilos distintos · pulsa cualquiera para verla en tamaño real
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-7">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TEMPLATES.map((t) => (
            <Link
              key={t.id}
              to={`/preview/${t.id}`}
              className="group overflow-hidden rounded-2xl border border-line bg-panel transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_14px_30px_-16px_rgba(23,24,26,0.35)]"
            >
              <MiniPreview theme={t.theme} height={168} className="border-b border-line/70" />
              <div className="px-3.5 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-bold text-ink">{t.name}</p>
                  <span className="text-[11px] text-mute opacity-0 transition group-hover:opacity-100">
                    Ver →
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-mute">
                  {t.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
