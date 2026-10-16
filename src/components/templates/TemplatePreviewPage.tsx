import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LinkPageView } from '../public/LinkPageView'
import { TEMPLATES } from '../../lib/templates'
import type { PageRow } from '../../lib/types'

// Vista previa a tamaño real de una plantilla, con contenido de muestra.
// Ruta: /#/preview/:templateId

const samplePage: Pick<PageRow, 'client_name' | 'tagline' | 'avatar_path'> = {
  client_name: 'Café Milagros',
  tagline: 'Café de especialidad · Centro histórico',
  avatar_path: `${import.meta.env.BASE_URL}demo-avatar.svg`,
}

const sampleLinks = [
  { key: 'l1', label: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
  { key: 'l2', label: 'Ver el menú', url: 'https://example.com/menu', icon: 'menu' },
  { key: 'l3', label: 'Reservar mesa', url: 'https://example.com/reservar', icon: 'calendar' },
  { key: 'l4', label: 'Déjanos tu reseña', url: 'https://example.com/resena', icon: 'reviews' },
  { key: 'l5', label: 'Cómo llegar', url: 'https://maps.google.com', icon: 'googlemaps' },
  { key: 'l6', label: 'WhatsApp', url: 'https://wa.me/5210000000000', icon: 'whatsapp' },
]

export function TemplatePreviewPage() {
  const { templateId = '' } = useParams()
  const index = TEMPLATES.findIndex((t) => t.id === templateId)
  const template = index >= 0 ? TEMPLATES[index] : null

  useEffect(() => {
    if (template) document.title = `${template.name} — Plantillas LinkHub`
  }, [template])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [templateId])

  if (!template) return <Navigate to="/galeria" replace />

  const prev = TEMPLATES[(index - 1 + TEMPLATES.length) % TEMPLATES.length]
  const next = TEMPLATES[(index + 1) % TEMPLATES.length]

  return (
    <div className="flex h-full min-h-0 flex-col bg-paper">
      <header
        data-preview-toolbar
        className="flex items-center gap-2 border-b border-line bg-panel px-4 py-2.5"
      >
        <Link
          to="/galeria"
          className="rounded-lg px-2.5 py-1.5 text-[13px] font-semibold text-ink-soft transition hover:bg-paper hover:text-ink"
        >
          ← Galería
        </Link>
        <div className="mx-1 h-4 w-px bg-line-strong" />
        <p className="font-display text-[13px] font-bold text-ink">{template.name}</p>
        <p className="hidden min-w-0 truncate text-xs text-mute sm:block">{template.description}</p>
        <div className="ml-auto flex items-center gap-1.5">
          <Link
            aria-label={`Plantilla anterior: ${prev.name}`}
            title={prev.name}
            to={`/preview/${prev.id}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-sm text-ink-soft transition hover:border-line-strong hover:bg-paper hover:text-ink"
          >
            ←
          </Link>
          <Link
            aria-label={`Plantilla siguiente: ${next.name}`}
            title={next.name}
            to={`/preview/${next.id}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-sm text-ink-soft transition hover:border-line-strong hover:bg-paper hover:text-ink"
          >
            →
          </Link>
        </div>
      </header>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
        <LinkPageView page={samplePage} theme={template.theme} links={sampleLinks} preview />
      </div>
    </div>
  )
}
