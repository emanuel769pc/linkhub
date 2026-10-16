import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { LinkPageView } from './public/LinkPageView'
import { TEMPLATE_MAP } from '../lib/templates'
import type { LinkRow } from '../lib/types'

// Enlaces de muestra para la maqueta de la landing
const demoLinks: Array<Pick<LinkRow, 'id' | 'label' | 'url' | 'icon'>> = [
  { id: '1', label: 'Ver menú', url: '#', icon: 'menu' },
  { id: '2', label: 'Instagram', url: '#', icon: 'instagram' },
  { id: '3', label: 'Reservar mesa', url: '#', icon: 'calendar' },
  { id: '4', label: 'Déjanos tu reseña', url: '#', icon: 'reviews' },
  { id: '5', label: 'Cómo llegar', url: '#', icon: 'googlemaps' },
]

export function LandingPage() {
  const theme = TEMPLATE_MAP['estudio'].theme

  return (
    <div className="min-h-full">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Link<span className="text-brand">Hub</span>
        </span>
        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-line-strong"
          >
            Entrar al panel
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl items-center gap-14 px-6 pt-10 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="font-display text-5xl leading-[1.05] font-extrabold tracking-tight text-balance lg:text-6xl">
            Una sola página con todos los enlaces de tu negocio.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">
            Crea la página de tu cliente en minutos: sube su foto, agrega sus botones y elige
            entre 25 plantillas. Publícala con un enlace propio y edítala cuando quieras.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-deep"
            >
              Crear la primera página
              <ArrowRight size={16} />
            </Link>
            <a
              href={`#/demo`}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-line-strong"
            >
              <ExternalLink size={15} />
              Ver una página de ejemplo
            </a>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="font-display font-bold text-ink">25</dt>
              <dd className="text-mute">plantillas listas</dd>
            </div>
            <div>
              <dt className="font-display font-bold text-ink">30+</dt>
              <dd className="text-mute">botones con iconos</dd>
            </div>
            <div>
              <dt className="font-display font-bold text-ink">1 min</dt>
              <dd className="text-mute">para publicar</dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto w-full max-w-[380px]">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[48px] bg-brand/10 blur-2xl" />
            <div className="overflow-hidden rounded-[40px] border-[9px] border-ink shadow-2xl">
              <div className="h-[560px] overflow-hidden">
                <LinkPageView
                  page={{
                    client_name: 'Café Milagros',
                    tagline: 'Café de especialidad · Centro histórico',
                    avatar_path: null,
                  }}
                  theme={theme}
                  links={demoLinks}
                  preview
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-line py-8">
        <p className="text-center text-sm text-mute">
          LinkHub — páginas de enlaces para negocios locales
        </p>
      </footer>
    </div>
  )
}
