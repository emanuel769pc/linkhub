import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkPageView } from './public/LinkPageView'
import { TEMPLATE_MAP } from '../lib/templates'
import type { LinkRow } from '../lib/types'

// Página de demostración fija (no necesita Supabase)

const demoLinks: Array<Pick<LinkRow, 'id' | 'label' | 'url' | 'icon'>> = [
  { id: '1', label: 'Ver el menú', url: '#', icon: 'menu' },
  { id: '2', label: 'Pedir por WhatsApp', url: '#', icon: 'whatsapp' },
  { id: '3', label: 'Déjanos tu reseña', url: '#', icon: 'reviews' },
  { id: '4', label: 'Instagram', url: '#', icon: 'instagram' },
  { id: '5', label: 'Cómo llegar', url: '#', icon: 'googlemaps' },
  { id: '6', label: 'Pedidos a domicilio', url: '#', icon: 'delivery' },
]

export function DemoPage() {
  useEffect(() => {
    document.title = 'Página de ejemplo — LinkHub'
  }, [])

  return (
    <div className="relative grid min-h-full">
      <LinkPageView
        page={{
          client_name: 'Tacos El Faro',
          tagline: 'Tacos al pastor · Hoy abierto de 13:00 a 23:00',
          avatar_path: null,
        }}
        theme={TEMPLATE_MAP['medianoche'].theme}
        links={demoLinks}
        preview
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-10 flex justify-center">
        <Link
          to="/"
          className="pointer-events-auto rounded-full bg-black/70 px-4 py-2 text-[12.5px] font-medium text-white/95 shadow-lg backdrop-blur transition hover:bg-black/85"
        >
          Hecha con LinkHub · Crea la tuya →
        </Link>
      </div>
    </div>
  )
}
