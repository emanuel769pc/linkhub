import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  Copy,
  ExternalLink,
  LogOut,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react'
import type { PageRow } from '../../lib/types'
import { avatarUrl, requireSupabase } from '../../lib/supabase'
import { publicPageUrl } from '../../lib/slug'
import { useAuth } from '../../hooks/useAuth'
import { Btn } from './ui'

export function DashboardPage() {
  const { session, signOut } = useAuth()
  const [pages, setPages] = useState<PageRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const sb = requireSupabase()
      const { data, error } = await sb
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false })
      if (error) throw new Error(error.message)
      setPages((data ?? []) as PageRow[])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar las páginas')
      setPages([])
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const removePage = async (id: string) => {
    const sb = requireSupabase()
    const { error } = await sb.from('pages').delete().eq('id', id)
    if (!error) setPages((prev) => (prev ?? []).filter((p) => p.id !== id))
  }

  const togglePublished = async (id: string, published: boolean) => {
    const sb = requireSupabase()
    const { error } = await sb.from('pages').update({ published }).eq('id', id)
    if (!error) {
      setPages((prev) =>
        (prev ?? []).map((p) => (p.id === id ? { ...p, published } : p)),
      )
    }
  }

  return (
    <div className="min-h-full">
      <header className="border-b border-line bg-panel">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-lg font-extrabold tracking-tight">
            Link<span className="text-brand">Hub</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-mute sm:block">{session?.user.email}</span>
            <button
              onClick={() => void signOut()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-1.5 text-sm font-semibold text-ink-soft transition hover:border-line-strong"
            >
              <LogOut size={15} />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Tus páginas</h1>
            <p className="mt-1 text-sm text-mute">
              {pages === null
                ? 'Cargando…'
                : pages.length === 0
                  ? 'Aún no hay ninguna'
                  : `${pages.length} ${pages.length === 1 ? 'página' : 'páginas'}`}
            </p>
          </div>
          <Link to="/nueva">
            <Btn>
              <Plus size={16} />
              Nueva página
            </Btn>
          </Link>
        </div>

        {error ? (
          <p className="mb-6 rounded-2xl border border-line bg-red-50 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        ) : null}

        {pages === null ? (
          <div className="flex justify-center py-20">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-line-strong border-t-brand" />
          </div>
        ) : pages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line-strong bg-panel px-6 py-16 text-center">
            <p className="font-display text-lg font-bold">Crea la primera página de un cliente</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-mute">
              Agrega el nombre del negocio, su foto y sus botones. Tendrá su propio enlace
              listo para compartir.
            </p>
            <Link to="/nueva" className="mt-6 inline-block">
              <Btn>
                <Plus size={16} />
                Nueva página
              </Btn>
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {pages.map((p) => (
              <PageRowItem
                key={p.id}
                page={p}
                onDelete={() => void removePage(p.id)}
                onTogglePublished={(v) => void togglePublished(p.id, v)}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

// ── Fila de una página ────────────────────────────────────────

function PageRowItem({
  page,
  onDelete,
  onTogglePublished,
}: {
  page: PageRow
  onDelete: () => void
  onTogglePublished: (v: boolean) => void
}) {
  const [copied, setCopied] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const img = avatarUrl(page.avatar_path)
  const url = publicPageUrl(page.slug)

  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <li className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-panel px-4 py-3.5 transition hover:border-line-strong">
      {img ? (
        <img src={img} alt="" className="h-11 w-11 rounded-full object-cover" />
      ) : (
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft font-display text-base font-bold text-brand">
          {page.client_name.charAt(0).toUpperCase()}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold">{page.client_name}</p>
          <button
            onClick={() => onTogglePublished(!page.published)}
            title={page.published ? 'Publicada — pulsa para ocultar' : 'Oculta — pulsa para publicar'}
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
              page.published
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            {page.published ? 'Publicada' : 'Oculta'}
          </button>
        </div>
        <p className="truncate text-xs text-mute">#/p/{page.slug}</p>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => void copy()}
          title="Copiar enlace"
          className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-ink-soft transition hover:border-line-strong"
        >
          {copied ? <Check size={13} className="text-ok" /> : <Copy size={13} />}
          {copied ? 'Copiado' : 'Enlace'}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir página pública"
          className="rounded-lg border border-line p-1.5 text-ink-soft transition hover:border-line-strong"
        >
          <ExternalLink size={14} />
        </a>
        <Link
          to={`/editar/${page.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-ink-soft"
        >
          <Pencil size={13} />
          Editar
        </Link>

        {confirmDelete ? (
          <span className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2 py-1">
            <span className="text-xs font-semibold text-danger">¿Eliminar?</span>
            <button
              onClick={onDelete}
              className="rounded-md bg-danger px-2 py-0.5 text-xs font-bold text-white"
            >
              Sí
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="rounded-md px-1.5 py-0.5 text-xs font-semibold text-ink-soft hover:bg-white"
            >
              No
            </button>
          </span>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            title="Eliminar página"
            className="rounded-lg border border-line p-1.5 text-ink-soft transition hover:border-red-200 hover:bg-red-50 hover:text-danger"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </li>
  )
}
