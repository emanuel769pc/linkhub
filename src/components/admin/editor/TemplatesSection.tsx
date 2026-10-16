import { Check } from 'lucide-react'
import type { usePageEditor } from '../../../hooks/usePageEditor'
import { TEMPLATES } from '../../../lib/templates'
import { MiniPreview } from './MiniPreview'
import { SectionTitle } from '../ui'

type Editor = ReturnType<typeof usePageEditor>

export function TemplatesSection({ editor }: { editor: Editor }) {
  const { page } = editor
  if (!page) return null

  return (
    <div>
      <SectionTitle hint="Elegir una plantilla aplica sus colores, fuentes y estilo de botones. Luego puedes ajustar todo en Diseño.">
        24 plantillas
      </SectionTitle>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((t) => {
          const active = page.template_id === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => editor.applyTemplate(t.id, t.theme)}
              className={`overflow-hidden rounded-2xl border text-left transition ${
                active
                  ? 'border-brand ring-2 ring-brand/30'
                  : 'border-line hover:border-line-strong'
              }`}
            >
              <MiniPreview theme={t.theme} height={124} />
              <div className="flex items-start justify-between gap-2 bg-white px-3 py-2.5">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-[13px] font-bold">
                    {t.name}
                    {active ? <Check size={13} className="shrink-0 text-brand" /> : null}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-mute">
                    {t.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
