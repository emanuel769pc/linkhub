// ─────────────────────────────────────────────────────────────
//  Tipos centrales de LinkHub
// ─────────────────────────────────────────────────────────────

export type ButtonVariant =
  | 'fill' // relleno sólido
  | 'outline' // solo borde
  | 'soft' // fondo tenue
  | 'glass' // translúcido con desenfoque
  | 'brutal' // borde grueso + sombra dura
  | 'underline' // texto con línea inferior
  | 'pill-glow' // píldora con resplandor

export type AvatarShape = 'circle' | 'squircle' | 'square'
export type ShadowStyle = 'none' | 'soft' | 'hard'
export type BtnSize = 'sm' | 'md' | 'lg'
export type TextAlign = 'center' | 'left'

export interface ButtonTheme {
  variant: ButtonVariant
  radius: number // px
  bg: string
  text: string
  border: string
  borderWidth: number
  shadow: ShadowStyle
  width: 'full' | 'auto'
  align: TextAlign
  uppercase: boolean
  bold: boolean
  size: BtnSize
  iconBefore: boolean // icono a la izquierda (false = derecha)
}

export interface AvatarTheme {
  shape: AvatarShape
  size: number
  ring: boolean
  ringColor: string
}

export interface Theme {
  bgType: 'solid' | 'gradient'
  bgColor: string
  gradFrom: string
  gradTo: string
  gradAngle: number
  fontDisplay: string // id de fuente (lib/fonts.ts)
  fontBody: string
  textColor: string
  mutedColor: string
  button: ButtonTheme
  avatar: AvatarTheme
  spacing: number // separación entre botones (px)
  maxWidth: number // ancho máx. del contenido (px)
  align: TextAlign
}

export interface Template {
  id: string
  name: string
  description: string
  theme: Theme
}

// ── Filas de la base de datos ────────────────────────────────

export interface PageRow {
  id: string
  slug: string
  client_name: string
  tagline: string | null
  avatar_path: string | null
  template_id: string
  theme: Theme
  published: boolean
  created_at: string
  updated_at: string
}

export interface LinkRow {
  id: string
  page_id: string
  label: string
  url: string
  icon: string
  sort_order: number
}

export interface PageWithLinks extends PageRow {
  links: LinkRow[]
}

// Enlace en edición (aún sin guardar)
export interface DraftLink {
  key: string // clave local, no persiste
  id: string | null // null = nuevo
  label: string
  url: string
  icon: string
}
