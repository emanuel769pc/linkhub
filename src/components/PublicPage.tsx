import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { LinkRow, PageRow } from '../lib/types'
import { supabase } from '../lib/supabase'
import { LinkPageView } from './public/LinkPageView'

// Página pública del cliente:  /#/p/:slug

export function PublicPage() {
  const { slug = '' } = useParams()
  const [state, setState] = useState<'loading' | 'ok' | 'missing'>('loading')
  const [page, setPage] = useState<PageRow | null>(null)
  const [links, setLinks] = useState<LinkRow[]>([])

  useEffect(() => {
    let alive = true
    ;(async () => {
      if (!supabase) {
        setState('missing')
        return
      }
      const { data: p } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle()
      if (!alive) return
      if (!p) {
        setState('missing')
        return
      }
      const { data: ls } = await supabase
        .from('links')
        .select('*')
        .eq('page_id', (p as PageRow).id)
        .order('sort_order', { ascending: true })
      if (!alive) return
      setPage(p as PageRow)
      setLinks((ls ?? []) as LinkRow[])
      setState('ok')
      document.title = (p as PageRow).client_name
    })()
    return () => {
      alive = false
    }
  }, [slug])

  if (state === 'loading') {
    return (
      <div className="flex min-h-full items-center justify-center bg-paper">
        <div className="flex items-center gap-3 text-mute">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-line-strong border-t-brand" />
          Cargando…
        </div>
      </div>
    )
  }

  if (state === 'missing' || !page) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
        <span className="font-display text-6xl font-extrabold text-line-strong">404</span>
        <h1 className="font-display text-xl font-bold">Esta página no existe o no está publicada</h1>
        <p className="max-w-sm text-sm text-mute">
          Revisa que el enlace esté bien escrito. Si eres el administrador, entra al panel para
          publicarla.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-deep"
        >
          Ir a LinkHub
        </Link>
      </div>
    )
  }

  return <LinkPageView page={page} theme={page.theme} links={links} />
}
