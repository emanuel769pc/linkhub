import { useCallback, useEffect, useRef, useState } from 'react'
import type { DraftLink, PageRow, Theme } from '../lib/types'
import { avatarUrl, requireSupabase } from '../lib/supabase'
import { uniqueSlug } from '../lib/slug'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

// ─────────────────────────────────────────────────────────────
//  Estado del editor con autoguardado (debounce ~800 ms)
// ─────────────────────────────────────────────────────────────

export function usePageEditor(pageId: string) {
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [page, setPage] = useState<PageRow | null>(null)
  const [links, setLinks] = useState<DraftLink[]>([])
  const [status, setStatus] = useState<SaveStatus>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const pageRef = useRef<PageRow | null>(null)
  const linksRef = useRef<DraftLink[]>([])
  const removedRef = useRef<Set<string>>(new Set())
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dirtyRef = useRef(false)

  pageRef.current = page
  linksRef.current = links

  // ── cargar ─────────────────────────────────────────────────
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const sb = requireSupabase()
        const { data: p } = await sb.from('pages').select('*').eq('id', pageId).maybeSingle()
        if (!alive) return
        if (!p) {
          setNotFound(true)
          setLoading(false)
          return
        }
        const { data: ls } = await sb
          .from('links')
          .select('*')
          .eq('page_id', pageId)
          .order('sort_order', { ascending: true })
        if (!alive) return
        setPage(p as PageRow)
        setLinks(
          (ls ?? []).map((l) => ({
            key: l.id as string,
            id: l.id as string,
            label: l.label as string,
            url: l.url as string,
            icon: l.icon as string,
          })),
        )
        setLoading(false)
      } catch {
        if (alive) {
          setNotFound(true)
          setLoading(false)
        }
      }
    })()
    return () => {
      alive = false
    }
  }, [pageId])

  // ── guardar ────────────────────────────────────────────────
  const doSave = useCallback(async () => {
    const p = pageRef.current
    if (!p) return
    setStatus('saving')
    setErrorMsg(null)
    try {
      const sb = requireSupabase()

      const { error: pageErr } = await sb
        .from('pages')
        .update({
          client_name: p.client_name,
          tagline: p.tagline,
          slug: p.slug,
          avatar_path: p.avatar_path,
          template_id: p.template_id,
          theme: p.theme,
          published: p.published,
        })
        .eq('id', p.id)
      if (pageErr) throw new Error(traduceError(pageErr.message))

      // enlaces: upsert de los actuales en orden
      const current = linksRef.current
      if (current.length > 0) {
        const rows = current.map((l, i) => ({
          ...(l.id ? { id: l.id } : {}),
          page_id: p.id,
          label: l.label.trim() || 'Enlace',
          url: l.url.trim() || '#',
          icon: l.icon,
          sort_order: i,
        }))
        const { data, error: upErr } = await sb
          .from('links')
          .upsert(rows)
          .select('id, sort_order')
        if (upErr) throw new Error(traduceError(upErr.message))
        const byOrder = [...(data ?? [])].sort(
          (a, b) => (a.sort_order as number) - (b.sort_order as number),
        )
        setLinks((prev) =>
          prev.map((l, i) => (l.id ? l : { ...l, id: (byOrder[i]?.id as string) ?? null })),
        )
      }

      // eliminar los borrados
      const removed = [...removedRef.current]
      if (removed.length > 0) {
        const { error: delErr } = await sb.from('links').delete().in('id', removed)
        if (delErr) throw new Error(traduceError(delErr.message))
        removedRef.current.clear()
      }

      setStatus('saved')
      setLastSaved(new Date())
      dirtyRef.current = false
    } catch (e) {
      setStatus('error')
      setErrorMsg(e instanceof Error ? e.message : 'No se pudo guardar')
    }
  }, [])

  const schedule = useCallback(() => {
    dirtyRef.current = true
    setStatus('saving')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => void doSave(), 800)
  }, [doSave])

  // guarda al salir de la página si hay cambios pendientes
  useEffect(() => {
    const onLeave = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        if (dirtyRef.current) void doSave()
      }
    }
    window.addEventListener('beforeunload', onLeave)
    return () => {
      window.removeEventListener('beforeunload', onLeave)
      onLeave()
    }
  }, [doSave])

  // ── mutaciones ─────────────────────────────────────────────
  const updatePage = useCallback(
    (patch: Partial<PageRow>) => {
      setPage((prev) => {
        if (!prev) return prev
        const next = { ...prev, ...patch }
        return next
      })
      schedule()
    },
    [schedule],
  )

  const setTheme = useCallback(
    (theme: Theme) => updatePage({ theme }),
    [updatePage],
  )

  const applyTemplate = useCallback(
    (templateId: string, theme: Theme) => updatePage({ template_id: templateId, theme }),
    [updatePage],
  )

  const addLink = useCallback(
    (init: { label: string; url: string; icon: string }) => {
      setLinks((prev) => [
        ...prev,
        {
          key: crypto.randomUUID(),
          id: null,
          label: init.label,
          url: init.url,
          icon: init.icon,
        },
      ])
      schedule()
    },
    [schedule],
  )

  const updateLink = useCallback(
    (key: string, patch: Partial<DraftLink>) => {
      setLinks((prev) => prev.map((l) => (l.key === key ? { ...l, ...patch } : l)))
      schedule()
    },
    [schedule],
  )

  const removeLink = useCallback(
    (key: string) => {
      setLinks((prev) => {
        const target = prev.find((l) => l.key === key)
        if (target?.id) removedRef.current.add(target.id)
        return prev.filter((l) => l.key !== key)
      })
      schedule()
    },
    [schedule],
  )

  const moveLink = useCallback(
    (key: string, dir: -1 | 1) => {
      setLinks((prev) => {
        const i = prev.findIndex((l) => l.key === key)
        const j = i + dir
        if (i < 0 || j < 0 || j >= prev.length) return prev
        const next = [...prev]
        ;[next[i], next[j]] = [next[j], next[i]]
        return next
      })
      schedule()
    },
    [schedule],
  )

  const uploadAvatar = useCallback(
    async (file: File) => {
      const sb = requireSupabase()
      const p = pageRef.current
      if (!p) return
      const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase()
      const path = `${p.id}/${crypto.randomUUID()}.${ext}`
      const { error } = await sb.storage
        .from('avatars')
        .upload(path, file, { cacheControl: '31536000', upsert: true })
      if (error) {
        setStatus('error')
        setErrorMsg('No se pudo subir la foto. Revisa que el bucket "avatars" exista.')
        return
      }
      updatePage({ avatar_path: path })
    },
    [updatePage],
  )

  const removeAvatar = useCallback(() => updatePage({ avatar_path: null }), [updatePage])

  const forceSave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    return doSave()
  }, [doSave])

  return {
    loading,
    notFound,
    page,
    links,
    status,
    errorMsg,
    lastSaved,
    get avatarPublicUrl() {
      return avatarUrl(page?.avatar_path)
    },
    updatePage,
    setTheme,
    applyTemplate,
    addLink,
    updateLink,
    removeLink,
    moveLink,
    uploadAvatar,
    removeAvatar,
    forceSave,
  }
}

// ── helpers ──────────────────────────────────────────────────

export async function isSlugTaken(slug: string, excludePageId: string): Promise<boolean> {
  const sb = requireSupabase()
  const { data } = await sb.from('pages').select('id').eq('slug', slug).maybeSingle()
  return Boolean(data && data.id !== excludePageId)
}

export async function suggestSlug(name: string): Promise<string> {
  return uniqueSlug(name, async (s) => {
    const sb = requireSupabase()
    const { data } = await sb.from('pages').select('id').eq('slug', s).maybeSingle()
    return Boolean(data)
  })
}

function traduceError(msg: string): string {
  if (msg.includes('duplicate key') && msg.includes('slug')) return 'Ese enlace ya está en uso. Elige otro.'
  if (msg.includes('row-level security')) return 'Sin permisos. ¿Iniciaste sesión como administrador?'
  return msg
}
