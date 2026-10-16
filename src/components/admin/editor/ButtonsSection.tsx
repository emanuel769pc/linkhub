import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import type { usePageEditor } from '../../../hooks/usePageEditor'
import { ICONS, IconView, PRESETS, PRESET_GROUPS, type ButtonPreset } from '../../../lib/icons'
import { Btn } from '../ui'

type Editor = ReturnType<typeof usePageEditor>

export function ButtonsSection({ editor }: { editor: Editor }) {
  const { links } = editor
  const [pickerOpen, setPickerOpen] = useState(links.length === 0)
  const [group, setGroup] = useState<ButtonPreset['group']>('Redes')
  const [iconPickerFor, setIconPickerFor] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {/* ── Lista de botones ── */}
      {links.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line-strong bg-paper px-4 py-6 text-center text-sm text-mute">
          Aún no hay botones. Elige uno de abajo para empezar.
        </p>
      ) : (
        <ul className="space-y-3">
          {links.map((l, i) => (
            <li key={l.key} className="space-y-2 rounded-2xl border border-line bg-white p-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  title="Cambiar icono"
                  onClick={() => setIconPickerFor(l.key)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-ink-soft transition hover:border-brand hover:text-brand"
                >
                  <IconView icon={l.icon} size={17} />
                </button>
                <input
                  value={l.label}
                  onChange={(e) => editor.updateLink(l.key, { label: e.target.value })}
                  placeholder="Texto del botón"
                  className="min-w-0 flex-1 rounded-lg border border-line px-2.5 py-1.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => editor.moveLink(l.key, -1)}
                    className="rounded-md p-1.5 text-mute transition hover:bg-paper hover:text-ink disabled:opacity-30"
                    title="Subir"
                  >
                    <ChevronUp size={15} />
                  </button>
                  <button
                    type="button"
                    disabled={i === links.length - 1}
                    onClick={() => editor.moveLink(l.key, 1)}
                    className="rounded-md p-1.5 text-mute transition hover:bg-paper hover:text-ink disabled:opacity-30"
                    title="Bajar"
                  >
                    <ChevronDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.removeLink(l.key)}
                    className="rounded-md p-1.5 text-mute transition hover:bg-red-50 hover:text-danger"
                    title="Eliminar"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-11">
                <LinkIcon size={13} className="shrink-0 text-mute" />
                <input
                  value={l.url}
                  onChange={(e) => editor.updateLink(l.key, { url: e.target.value })}
                  placeholder="https://…"
                  className="min-w-0 flex-1 rounded-lg border border-line px-2.5 py-1.5 font-mono text-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ── Agregar botón ── */}
      <Btn variant={pickerOpen ? 'ghost' : 'primary'} onClick={() => setPickerOpen(!pickerOpen)} className="w-full">
        {pickerOpen ? <X size={15} /> : <Plus size={15} />}
        {pickerOpen ? 'Cerrar' : 'Agregar botón'}
      </Btn>

      {pickerOpen ? (
        <div className="rounded-2xl border border-line bg-paper p-3">
          <div className="mb-3 flex gap-1 rounded-xl border border-line bg-white p-1">
            {PRESET_GROUPS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
                  group === g ? 'bg-ink text-white' : 'text-ink-soft hover:bg-paper'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {PRESETS.filter((p) => p.group === group).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  editor.addLink({ label: p.defaultLabel, url: p.urlHint, icon: p.icon })
                }}
                className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-left text-[13px] font-semibold text-ink-soft transition hover:border-brand hover:text-brand"
              >
                <IconView icon={p.icon} size={16} />
                <span className="truncate">{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* ── Selector de icono ── */}
      {iconPickerFor ? (
        <IconPicker
          current={links.find((l) => l.key === iconPickerFor)?.icon ?? 'link'}
          onPick={(id) => {
            editor.updateLink(iconPickerFor, { icon: id })
            setIconPickerFor(null)
          }}
          onClose={() => setIconPickerFor(null)}
        />
      ) : null}
    </div>
  )
}

// ── Modal con todos los iconos ────────────────────────────────

function IconPicker({
  current,
  onPick,
  onClose,
}: {
  current: string
  onPick: (id: string) => void
  onClose: () => void
}) {
  const [q, setQ] = useState('')
  const filtered = ICONS.filter((i) =>
    i.label.toLowerCase().includes(q.trim().toLowerCase()),
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-xl flex-col rounded-3xl border border-line bg-panel p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-bold">Elige un icono</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-mute hover:bg-paper">
            <X size={17} />
          </button>
        </div>

        <div className="relative mb-4">
          <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar icono…"
            autoFocus
            className="w-full rounded-xl border border-line py-2 pr-3 pl-9 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div className="scroll-thin grid grid-cols-6 gap-1.5 overflow-y-auto sm:grid-cols-8">
          {filtered.map((i) => (
            <button
              key={i.id}
              type="button"
              title={i.label}
              onClick={() => onPick(i.id)}
              className={`flex h-11 items-center justify-center rounded-xl border transition ${
                current === i.id
                  ? 'border-brand bg-brand-soft text-brand'
                  : 'border-line bg-white text-ink-soft hover:border-brand hover:text-brand'
              }`}
            >
              <IconView icon={i.id} size={19} />
            </button>
          ))}
          {filtered.length === 0 ? (
            <p className="col-span-full py-6 text-center text-sm text-mute">Sin resultados</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
