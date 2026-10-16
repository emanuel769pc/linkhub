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
  return (
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
  )
}
