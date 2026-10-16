import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ExternalLink,
  LayoutGrid,
  Link2,
  Palette,
  RefreshCw,
  User,
} from 'lucide-react'
import { usePageEditor, type SaveStatus } from '../../hooks/usePageEditor'
import { publicPageUrl } from '../../lib/slug'
import { LinkPageView } from '../public/LinkPageView'
import { ProfileSection } from './editor/ProfileSection'
import { ButtonsSection } from './editor/ButtonsSection'
import { TemplatesSection } from './editor/TemplatesSection'
import { DesignSection } from './editor/DesignSection'

type Tab = 'perfil' | 'botones' | 'plantilla' | 'diseno'

const TABS: Array<{ id: Tab; label: string; icon: typeof User }> = [
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'botones', label: 'Botones', icon: Link2 },
  { id: 'plantilla', label: 'Plantilla', icon: LayoutGrid },
  { id: 'diseno', label: 'Diseño', icon: Palette },
]

export function EditorPage() {
  const { id = '' } = useParams()
  const editor = usePageEditor(id)
  const [tab, setTab] = useState<Tab>('botones')

  if (editor.loading) {
    return (
      <div className="flex h-full items-center justify-center bg-paper">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-line-strong border-t-brand" />
      </div>
    )
  }

  if (editor.notFound || !editor.page) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
        <h1 className="font-display text-xl font-bold">No encontramos esa página</h1>
        <p className="max-w-sm text-sm text-mute">
          Puede que se haya eliminado o que el enlace esté mal escrito.
        </p>
        <Link
          to="/panel"
          className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep"
        >
          Volver al panel
        </Link>
      </div>
    )
  }

  const { page, links, status, errorMsg, lastSaved } = editor

  return (
    <div className="flex h-full flex-col">
      {/* ── Barra superior ── */}
      <header className="flex items-center gap-3 border-b border-line bg-panel px-4 py-2.5">
        <Link
          to="/panel"
          className="rounded-lg p-2 text-ink-soft transition hover:bg-paper"
          title="Volver al panel"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold">
            {page.client_name || 'Sin nombre'}
          </p>
          <p className="truncate text-[11px] text-mute">#/p/{page.slug}</p>
        </div>

        <div className="ml-3 hidden sm:block">
          <SaveIndicator
            status={status}
            errorMsg={errorMsg}
            lastSaved={lastSaved}
            onRetry={() => void editor.forceSave()}
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => editor.updatePage({ published: !page.published })}
            title={
              page.published
                ? 'Visible para todo el mundo — pulsa para ocultarla'
                : 'Oculta — pulsa para publicarla'
            }
            className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
              page.published
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-amber-200 bg-amber-50 text-amber-700'
            }`}
          >
            {page.published ? '● Publicada' : '○ Oculta'}
          </button>
          <a
            href={publicPageUrl(page.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold text-ink-soft transition hover:border-line-strong"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Ver página</span>
          </a>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* ── Panel izquierdo ── */}
        <aside className="flex w-full flex-col border-r border-line bg-panel lg:w-[420px] lg:shrink-0">
          <nav className="grid grid-cols-4 border-b border-line">
            {TABS.map((t) => {
              const Icon = t.icon
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`flex flex-col items-center gap-1 border-b-2 py-2.5 text-[11px] font-bold transition ${
                    active
                      ? 'border-brand text-brand'
                      : 'border-transparent text-mute hover:text-ink-soft'
                  }`}
                >
                  <Icon size={17} />
                  {t.label}
                </button>
              )
            })}
          </nav>

          <div className="scroll-thin min-h-0 flex-1 overflow-y-auto p-4">
            {tab === 'perfil' ? <ProfileSection editor={editor} /> : null}
            {tab === 'botones' ? <ButtonsSection editor={editor} /> : null}
            {tab === 'plantilla' ? <TemplatesSection editor={editor} /> : null}
            {tab === 'diseno' ? <DesignSection editor={editor} /> : null}
          </div>

          <div className="border-t border-line px-4 py-2 sm:hidden">
            <SaveIndicator
              status={status}
              errorMsg={errorMsg}
              lastSaved={lastSaved}
              onRetry={() => void editor.forceSave()}
            />
          </div>
        </aside>

        {/* ── Vista previa ── */}
        <main
          className="relative hidden min-w-0 flex-1 items-center justify-center overflow-hidden p-6 lg:flex"
          style={{
            backgroundImage: 'radial-gradient(circle, #d6d6d1 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        >
          <div className="flex h-full max-h-[820px] w-[400px] flex-col overflow-hidden rounded-[44px] border-[10px] border-ink bg-white shadow-2xl">
            <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
              <LinkPageView page={page} theme={page.theme} links={links} preview />
            </div>
          </div>
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-mute backdrop-blur">
            Vista previa en vivo · todo se guarda solo
          </p>
        </main>
      </div>
    </div>
  )
}

// ── Indicador de guardado ─────────────────────────────────────

function SaveIndicator({
  status,
  errorMsg,
  lastSaved,
  onRetry,
}: {
  status: SaveStatus
  errorMsg: string | null
  lastSaved: Date | null
  onRetry: () => void
}) {
  if (status === 'saving') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-mute">
        <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-line-strong border-t-brand" />
        Guardando…
      </span>
    )
  }
  if (status === 'saved') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ok">
        <Check size={13} />
        Guardado
        {lastSaved
          ? ` · ${lastSaved.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}`
          : ''}
      </span>
    )
  }
  if (status === 'error') {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-danger"
        title={errorMsg ?? undefined}
      >
        <AlertTriangle size={13} />
        <span className="max-w-[180px] truncate">{errorMsg ?? 'No se pudo guardar'}</span>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1 rounded-md border border-red-200 px-1.5 py-0.5 hover:bg-red-50"
        >
          <RefreshCw size={11} />
          Reintentar
        </button>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-mute">
      <Check size={13} />
      Listo
    </span>
  )
}
