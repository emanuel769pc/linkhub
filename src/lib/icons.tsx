import type { ComponentType } from 'react'
import {
  Beer,
  BookOpen,
  Briefcase,
  Cake,
  CalendarDays,
  Camera,
  Car,
  Clock,
  Coffee,
  CreditCard,
  Download,
  Dumbbell,
  FileText,
  Gift,
  Globe,
  HandCoins,
  Heart,
  Home,
  Info,
  Leaf,
  Link as LinkIcon,
  Mail,
  MapPin,
  MessageCircle,
  Percent,
  Phone,
  Pizza,
  Play,
  Scissors,
  Send,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Stethoscope,
  Tag,
  Ticket,
  Truck,
  Users,
  UtensilsCrossed,
  Video,
  Wallet,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import {
  siFacebook,
  siGoogle,
  siGooglemaps,
  siInstagram,
  siPinterest,
  siSpotify,
  siTelegram,
  siThreads,
  siTiktok,
  siWhatsapp,
  siX,
  siYoutube,
} from 'simple-icons'

// LinkedIn ya no está en simple-icons (retirado por la marca); SVG propio
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'

// ─────────────────────────────────────────────────────────────
//  Iconos disponibles para botones
//  Marca = simple-icons (relleno) · Genérico = lucide (trazo)
// ─────────────────────────────────────────────────────────────

type IconEntry =
  | { id: string; label: string; kind: 'brand'; path: string }
  | { id: string; label: string; kind: 'lucide'; icon: LucideIcon }

export const ICONS: IconEntry[] = [
  // Redes y plataformas
  { id: 'instagram', label: 'Instagram', kind: 'brand', path: siInstagram.path },
  { id: 'facebook', label: 'Facebook', kind: 'brand', path: siFacebook.path },
  { id: 'tiktok', label: 'TikTok', kind: 'brand', path: siTiktok.path },
  { id: 'whatsapp', label: 'WhatsApp', kind: 'brand', path: siWhatsapp.path },
  { id: 'youtube', label: 'YouTube', kind: 'brand', path: siYoutube.path },
  { id: 'spotify', label: 'Spotify', kind: 'brand', path: siSpotify.path },
  { id: 'linkedin', label: 'LinkedIn', kind: 'brand', path: LINKEDIN_PATH },
  { id: 'x', label: 'X (Twitter)', kind: 'brand', path: siX.path },
  { id: 'telegram', label: 'Telegram', kind: 'brand', path: siTelegram.path },
  { id: 'threads', label: 'Threads', kind: 'brand', path: siThreads.path },
  { id: 'pinterest', label: 'Pinterest', kind: 'brand', path: siPinterest.path },
  { id: 'google', label: 'Google', kind: 'brand', path: siGoogle.path },
  { id: 'googlemaps', label: 'Google Maps', kind: 'brand', path: siGooglemaps.path },
  // Negocio y general
  { id: 'menu', label: 'Menú / Carta', kind: 'lucide', icon: UtensilsCrossed },
  { id: 'reviews', label: 'Reseñas', kind: 'lucide', icon: Star },
  { id: 'maps', label: 'Ubicación', kind: 'lucide', icon: MapPin },
  { id: 'phone', label: 'Teléfono', kind: 'lucide', icon: Phone },
  { id: 'email', label: 'Email', kind: 'lucide', icon: Mail },
  { id: 'web', label: 'Sitio web', kind: 'lucide', icon: Globe },
  { id: 'calendar', label: 'Reservas / Citas', kind: 'lucide', icon: CalendarDays },
  { id: 'shop', label: 'Tienda', kind: 'lucide', icon: ShoppingBag },
  { id: 'cart', label: 'Pedidos online', kind: 'lucide', icon: ShoppingCart },
  { id: 'delivery', label: 'Domicilios', kind: 'lucide', icon: Truck },
  { id: 'drive', label: 'Cómo llegar', kind: 'lucide', icon: Car },
  { id: 'file', label: 'Documento / PDF', kind: 'lucide', icon: FileText },
  { id: 'download', label: 'Descarga', kind: 'lucide', icon: Download },
  { id: 'camera', label: 'Portafolio', kind: 'lucide', icon: Camera },
  { id: 'video', label: 'Video', kind: 'lucide', icon: Video },
  { id: 'play', label: 'Reproducir', kind: 'lucide', icon: Play },
  { id: 'scissors', label: 'Servicios', kind: 'lucide', icon: Scissors },
  { id: 'dumbbell', label: 'Clases / Gym', kind: 'lucide', icon: Dumbbell },
  { id: 'stethoscope', label: 'Consultas', kind: 'lucide', icon: Stethoscope },
  { id: 'coffee', label: 'Café', kind: 'lucide', icon: Coffee },
  { id: 'pizza', label: 'Comida', kind: 'lucide', icon: Pizza },
  { id: 'beer', label: 'Bar', kind: 'lucide', icon: Beer },
  { id: 'cake', label: 'Pastelería', kind: 'lucide', icon: Cake },
  { id: 'leaf', label: 'Natural', kind: 'lucide', icon: Leaf },
  { id: 'wifi', label: 'WiFi', kind: 'lucide', icon: Wifi },
  { id: 'clock', label: 'Horario', kind: 'lucide', icon: Clock },
  { id: 'calendar-check', label: 'Eventos', kind: 'lucide', icon: Users },
  { id: 'gift', label: 'Regalos', kind: 'lucide', icon: Gift },
  { id: 'ticket', label: 'Entradas', kind: 'lucide', icon: Ticket },
  { id: 'percent', label: 'Promociones', kind: 'lucide', icon: Percent },
  { id: 'tag', label: 'Precios', kind: 'lucide', icon: Tag },
  { id: 'wallet', label: 'Pagos', kind: 'lucide', icon: Wallet },
  { id: 'card', label: 'Tarjeta', kind: 'lucide', icon: CreditCard },
  { id: 'tip', label: 'Propina / Apoyo', kind: 'lucide', icon: HandCoins },
  { id: 'heart', label: 'Favoritos', kind: 'lucide', icon: Heart },
  { id: 'send', label: 'Newsletter', kind: 'lucide', icon: Send },
  { id: 'chat', label: 'Chat', kind: 'lucide', icon: MessageCircle },
  { id: 'book', label: 'Blog / Libro', kind: 'lucide', icon: BookOpen },
  { id: 'briefcase', label: 'Servicios pro', kind: 'lucide', icon: Briefcase },
  { id: 'home', label: 'Inicio', kind: 'lucide', icon: Home },
  { id: 'sparkles', label: 'Novedades', kind: 'lucide', icon: Sparkles },
  { id: 'info', label: 'Información', kind: 'lucide', icon: Info },
  { id: 'link', label: 'Enlace', kind: 'lucide', icon: LinkIcon },
]

export const ICON_MAP: Record<string, IconEntry> = Object.fromEntries(ICONS.map((i) => [i.id, i]))

export function IconView({
  icon,
  size = 20,
  className,
}: {
  icon: string
  size?: number
  className?: string
}) {
  const entry = ICON_MAP[icon]
  if (!entry || entry.kind === 'lucide') {
    const C: ComponentType<{ size?: number; className?: string; strokeWidth?: number }> =
      entry && entry.kind === 'lucide' ? entry.icon : LinkIcon
    return <C size={size} className={className} strokeWidth={2} />
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={entry.path} />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
//  Presets: al pulsarlos se agrega un botón ya configurado
// ─────────────────────────────────────────────────────────────

export interface ButtonPreset {
  id: string
  label: string // nombre del preset en el picker
  icon: string
  defaultLabel: string // texto sugerido del botón
  urlHint: string // plantilla de URL
  group: 'Redes' | 'Negocio' | 'General'
}

export const PRESETS: ButtonPreset[] = [
  // Redes
  { id: 'p-instagram', label: 'Instagram', icon: 'instagram', defaultLabel: 'Instagram', urlHint: 'https://instagram.com/tu-usuario', group: 'Redes' },
  { id: 'p-whatsapp', label: 'WhatsApp', icon: 'whatsapp', defaultLabel: 'WhatsApp', urlHint: 'https://wa.me/5210000000000', group: 'Redes' },
  { id: 'p-facebook', label: 'Facebook', icon: 'facebook', defaultLabel: 'Facebook', urlHint: 'https://facebook.com/tu-pagina', group: 'Redes' },
  { id: 'p-tiktok', label: 'TikTok', icon: 'tiktok', defaultLabel: 'TikTok', urlHint: 'https://tiktok.com/@tu-usuario', group: 'Redes' },
  { id: 'p-youtube', label: 'YouTube', icon: 'youtube', defaultLabel: 'YouTube', urlHint: 'https://youtube.com/@tu-canal', group: 'Redes' },
  { id: 'p-spotify', label: 'Spotify', icon: 'spotify', defaultLabel: 'Spotify', urlHint: 'https://open.spotify.com/...', group: 'Redes' },
  { id: 'p-x', label: 'X', icon: 'x', defaultLabel: 'X', urlHint: 'https://x.com/tu-usuario', group: 'Redes' },
  { id: 'p-linkedin', label: 'LinkedIn', icon: 'linkedin', defaultLabel: 'LinkedIn', urlHint: 'https://linkedin.com/in/tu-perfil', group: 'Redes' },
  { id: 'p-telegram', label: 'Telegram', icon: 'telegram', defaultLabel: 'Telegram', urlHint: 'https://t.me/tu-canal', group: 'Redes' },
  { id: 'p-threads', label: 'Threads', icon: 'threads', defaultLabel: 'Threads', urlHint: 'https://threads.net/@tu-usuario', group: 'Redes' },
  { id: 'p-pinterest', label: 'Pinterest', icon: 'pinterest', defaultLabel: 'Pinterest', urlHint: 'https://pinterest.com/tu-usuario', group: 'Redes' },
  // Negocio
  { id: 'p-menu', label: 'Menú / Carta', icon: 'menu', defaultLabel: 'Ver menú', urlHint: 'https://tusitio.com/menu.pdf', group: 'Negocio' },
  { id: 'p-reviews', label: 'Reseñas Google', icon: 'reviews', defaultLabel: 'Déjanos tu reseña', urlHint: 'https://g.page/r/tu-negocio/review', group: 'Negocio' },
  { id: 'p-maps', label: 'Ubicación', icon: 'googlemaps', defaultLabel: 'Cómo llegar', urlHint: 'https://maps.google.com/?q=tu+direccion', group: 'Negocio' },
  { id: 'p-phone', label: 'Llamar', icon: 'phone', defaultLabel: 'Llámanos', urlHint: 'tel:+5210000000000', group: 'Negocio' },
  { id: 'p-email', label: 'Email', icon: 'email', defaultLabel: 'Escríbenos', urlHint: 'mailto:hola@tusitio.com', group: 'Negocio' },
  { id: 'p-web', label: 'Sitio web', icon: 'web', defaultLabel: 'Nuestro sitio', urlHint: 'https://tusitio.com', group: 'Negocio' },
  { id: 'p-booking', label: 'Reservas', icon: 'calendar', defaultLabel: 'Reservar cita', urlHint: 'https://tu-agenda.com/reservar', group: 'Negocio' },
  { id: 'p-shop', label: 'Tienda', icon: 'shop', defaultLabel: 'Tienda online', urlHint: 'https://tienda.tusitio.com', group: 'Negocio' },
  { id: 'p-orders', label: 'Pedidos', icon: 'cart', defaultLabel: 'Pedir online', urlHint: 'https://pedidos.tusitio.com', group: 'Negocio' },
  { id: 'p-delivery', label: 'Domicilios', icon: 'delivery', defaultLabel: 'Domicilios', urlHint: 'https://tu-domicilio.com', group: 'Negocio' },
  { id: 'p-wifi', label: 'WiFi', icon: 'wifi', defaultLabel: 'Contraseña WiFi', urlHint: 'https://tusitio.com/wifi', group: 'Negocio' },
  { id: 'p-hours', label: 'Horario', icon: 'clock', defaultLabel: 'Horarios', urlHint: 'https://tusitio.com/horarios', group: 'Negocio' },
  // General
  { id: 'p-portfolio', label: 'Portafolio', icon: 'camera', defaultLabel: 'Portafolio', urlHint: 'https://instagram.com/tu-trabajo', group: 'General' },
  { id: 'p-services', label: 'Servicios', icon: 'scissors', defaultLabel: 'Nuestros servicios', urlHint: 'https://tusitio.com/servicios', group: 'General' },
  { id: 'p-tip', label: 'Propina', icon: 'tip', defaultLabel: 'Deja tu propina', urlHint: 'https://tu-link-de-pago.com', group: 'General' },
  { id: 'p-news', label: 'Newsletter', icon: 'send', defaultLabel: 'Suscríbete', urlHint: 'https://tu-newsletter.com', group: 'General' },
  { id: 'p-tickets', label: 'Entradas', icon: 'ticket', defaultLabel: 'Comprar entradas', urlHint: 'https://tu-ticketera.com', group: 'General' },
  { id: 'p-custom', label: 'Personalizado', icon: 'link', defaultLabel: 'Nuevo enlace', urlHint: 'https://...', group: 'General' },
]

export const PRESET_GROUPS: Array<ButtonPreset['group']> = ['Redes', 'Negocio', 'General']
