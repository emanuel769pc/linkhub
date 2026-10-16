import type { Template, Theme } from './types'

// ─────────────────────────────────────────────────────────────
//  24 plantillas — cada una con una dirección estética propia.
//  Después de aplicar una, TODO es editable en el panel.
// ─────────────────────────────────────────────────────────────

const base: Theme = {
  bgType: 'solid',
  bgColor: '#ffffff',
  gradFrom: '#ffffff',
  gradTo: '#eef0ff',
  gradAngle: 180,
  fontDisplay: 'sora',
  fontBody: 'hanken',
  textColor: '#17181a',
  mutedColor: '#64748b',
  button: {
    variant: 'fill',
    radius: 12,
    bg: '#17181a',
    text: '#ffffff',
    border: '#17181a',
    borderWidth: 1,
    shadow: 'none',
    width: 'full',
    align: 'center',
    uppercase: false,
    bold: false,
    size: 'md',
    iconBefore: true,
  },
  avatar: { shape: 'circle', size: 96, ring: false, ringColor: '#ffffff' },
  spacing: 12,
  maxWidth: 420,
  align: 'center',
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

function merge<T>(base: T, patch: DeepPartial<T>): T {
  const out = { ...base } as Record<string, unknown>
  for (const key of Object.keys(patch as object)) {
    const v = (patch as Record<string, unknown>)[key]
    const b = (base as Record<string, unknown>)[key]
    if (v && typeof v === 'object' && !Array.isArray(v) && b && typeof b === 'object') {
      out[key] = merge(b, v as DeepPartial<unknown>)
    } else if (v !== undefined) {
      out[key] = v
    }
  }
  return out as T
}

function mk(id: string, name: string, description: string, patch: DeepPartial<Theme>): Template {
  return { id, name, description, theme: merge(base, patch) }
}

export const TEMPLATES: Template[] = [
  mk('estudio', 'Estudio', 'Blanco de galería, tipografía Sora y botones de tinta', {
    bgColor: '#FCFCFB',
    fontDisplay: 'sora',
    fontBody: 'sora',
    textColor: '#141517',
    mutedColor: '#6E7175',
    button: { variant: 'fill', radius: 10, bg: '#141517', text: '#FCFCFB', border: '#141517', shadow: 'soft' },
    avatar: { shape: 'squircle', size: 92 },
  }),

  mk('papel', 'Papel', 'Papel cálido y serif Fraunces, como una carta bien impresa', {
    bgColor: '#F5F1E8',
    fontDisplay: 'fraunces',
    fontBody: 'hanken',
    textColor: '#2A2620',
    mutedColor: '#7A7365',
    button: {
      variant: 'fill', radius: 8, bg: '#FFFFFF', text: '#2A2620', border: '#E4DCCB',
      borderWidth: 1, shadow: 'soft',
    },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FFFFFF' },
    spacing: 10,
  }),

  mk('tinta', 'Tinta', 'Casi negro con botones de cristal y Syne en los títulos', {
    bgColor: '#101113',
    fontDisplay: 'syne',
    fontBody: 'hanken',
    textColor: '#F4F4F5',
    mutedColor: '#9CA3AF',
    button: {
      variant: 'glass', radius: 14, bg: '#FFFFFF14', text: '#F4F4F5', border: '#FFFFFF2E',
      borderWidth: 1, shadow: 'none',
    },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FFFFFF26' },
  }),

  mk('salvia', 'Salvia', 'Verde herbal tranquilo, serif Newsreader y píldoras profundas', {
    bgColor: '#E8EEE6',
    fontDisplay: 'newsreader',
    fontBody: 'manrope',
    textColor: '#22301F',
    mutedColor: '#5F7A58',
    button: { variant: 'fill', radius: 999, bg: '#2F4A2B', text: '#F2F7F0', border: '#2F4A2B', shadow: 'soft' },
    avatar: { shape: 'circle', size: 100, ring: true, ringColor: '#FFFFFF' },
    spacing: 14,
  }),

  mk('medianoche', 'Medianoche', 'Degradado de noche profunda con botones de cristal índigo', {
    bgType: 'gradient',
    gradFrom: '#0F172A',
    gradTo: '#312E81',
    gradAngle: 160,
    fontDisplay: 'space',
    fontBody: 'work',
    textColor: '#E0E7FF',
    mutedColor: '#A5B4FC',
    button: {
      variant: 'soft', radius: 999, bg: '#FFFFFF12', text: '#E0E7FF', border: '#E0E7FF33',
      borderWidth: 1, shadow: 'none',
    },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#E0E7FF4D' },
  }),

  mk('cobre', 'Cobre', 'Crema suave con acento cobre y DM Serif de exhibición', {
    bgColor: '#FAF3EC',
    fontDisplay: 'dmserif',
    fontBody: 'epilogue',
    textColor: '#3A2A1E',
    mutedColor: '#8A6D58',
    button: {
      variant: 'fill', radius: 10, bg: '#A85A22', text: '#FDF8F3', border: '#A85A22', shadow: 'soft',
    },
    avatar: { shape: 'squircle', size: 96, ring: true, ringColor: '#FFFFFF' },
  }),

  mk('menta', 'Menta', 'Degradado menta fresco con botones blancos redondeados', {
    bgType: 'gradient',
    gradFrom: '#A7F3D0',
    gradTo: '#5EEAD4',
    gradAngle: 200,
    fontDisplay: 'outfit',
    fontBody: 'outfit',
    textColor: '#064E3B',
    mutedColor: '#0F766E',
    button: {
      variant: 'fill', radius: 18, bg: '#FFFFFF', text: '#065F46', border: '#FFFFFF',
      shadow: 'soft',
    },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FFFFFF' },
  }),

  mk('cereza', 'Cereza', 'Rosa pálido con acento carmín y Playfair elegante', {
    bgColor: '#FFF1F2',
    fontDisplay: 'playfair',
    fontBody: 'work',
    textColor: '#4C0519',
    mutedColor: '#9F5568',
    button: { variant: 'fill', radius: 999, bg: '#E11D48', text: '#FFFFFF', border: '#E11D48', shadow: 'soft' },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FFFFFF' },
  }),

  mk('grafito', 'Grafito', 'Gris limpio con marcos gruesos, casi tipográfico', {
    bgColor: '#F4F4F5',
    fontDisplay: 'manrope',
    fontBody: 'manrope',
    textColor: '#18181B',
    mutedColor: '#71717A',
    button: {
      variant: 'brutal', radius: 6, bg: '#FFFFFF', text: '#18181B', border: '#18181B',
      borderWidth: 2, shadow: 'hard',
    },
    avatar: { shape: 'square', size: 88, ring: true, ringColor: '#18181B' },
    spacing: 14,
  }),

  mk('neon', 'Neón', 'Oscuro con acento cian y etiquetas monoespaciadas', {
    bgColor: '#0B0E14',
    fontDisplay: 'bricolage',
    fontBody: 'plexmono',
    textColor: '#E5E7EB',
    mutedColor: '#67E8F9',
    button: {
      variant: 'pill-glow', radius: 999, bg: '#22D3EE14', text: '#67E8F9', border: '#22D3EE66',
      borderWidth: 1, shadow: 'none',
    },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#22D3EE59' },
    spacing: 12,
  }),

  mk('arena', 'Arena', 'Tonos desierto con Lora y botones de esquina suave', {
    bgColor: '#EFE9DD',
    fontDisplay: 'lora',
    fontBody: 'lora',
    textColor: '#3D3A33',
    mutedColor: '#8B836F',
    button: {
      variant: 'fill', radius: 4, bg: '#3D3A33', text: '#F2EEE4', border: '#3D3A33', shadow: 'hard',
    },
    avatar: { shape: 'square', size: 88, ring: true, ringColor: '#FFFFFF' },
    spacing: 10,
  }),

  mk('bosque', 'Bosque', 'Verde profundo con contornos luminosos y Fraunces', {
    bgType: 'gradient',
    gradFrom: '#14532D',
    gradTo: '#052E16',
    gradAngle: 180,
    fontDisplay: 'fraunces',
    fontBody: 'hanken',
    textColor: '#DCFCE7',
    mutedColor: '#86EFAC',
    button: {
      variant: 'outline', radius: 999, bg: '#00000000', text: '#BBF7D0', border: '#4ADE8066',
      borderWidth: 1, shadow: 'none',
    },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#4ADE8059' },
  }),

  mk('cielo', 'Cielo', 'Degradado azul sereno con botones blancos flotantes', {
    bgType: 'gradient',
    gradFrom: '#EFF6FF',
    gradTo: '#BFDBFE',
    gradAngle: 180,
    fontDisplay: 'work',
    fontBody: 'work',
    textColor: '#1E3A8A',
    mutedColor: '#3B82F6',
    button: { variant: 'fill', radius: 16, bg: '#FFFFFF', text: '#1D4ED8', border: '#FFFFFF', shadow: 'soft' },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FFFFFF' },
  }),

  mk('durazno', 'Durazno', 'Degradado cálido de melocotón con Playfair', {
    bgType: 'gradient',
    gradFrom: '#FFEDD5',
    gradTo: '#FDBA74',
    gradAngle: 200,
    fontDisplay: 'playfair',
    fontBody: 'hanken',
    textColor: '#7C2D12',
    mutedColor: '#9A3412',
    button: { variant: 'fill', radius: 999, bg: '#7C2D12', text: '#FFF7ED', border: '#7C2D12', shadow: 'soft' },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FFFFFF' },
  }),

  mk('vino', 'Vino', 'Borgoña con texto que se subraya al pasar, para mesas largas', {
    bgColor: '#2A0A12',
    fontDisplay: 'cormorant',
    fontBody: 'cormorant',
    textColor: '#FBE9EF',
    mutedColor: '#C99AA9',
    button: {
      variant: 'underline', radius: 0, bg: '#00000000', text: '#FBE9EF', border: '#FBE9EF59',
      borderWidth: 1, shadow: 'none',
    },
    avatar: { shape: 'circle', size: 104, ring: true, ringColor: '#FBE9EF33' },
    spacing: 18,
  }),

  mk('nieve', 'Nieve', 'Blanco total con cristal suave y azul frío', {
    bgType: 'gradient',
    gradFrom: '#FFFFFF',
    gradTo: '#EEF2FF',
    gradAngle: 180,
    fontDisplay: 'archivo',
    fontBody: 'archivo',
    textColor: '#0F172A',
    mutedColor: '#64748B',
    button: {
      variant: 'glass', radius: 14, bg: '#FFFFFFB3', text: '#0F172A', border: '#E2E8F0',
      borderWidth: 1, shadow: 'soft',
    },
    avatar: { shape: 'squircle', size: 92, ring: true, ringColor: '#FFFFFF' },
  }),

  mk('kraft', 'Kraft', 'Papel kraft y monoespaciada, aire de café de barrio', {
    bgColor: '#D9C7A7',
    fontDisplay: 'spacemono',
    fontBody: 'spacemono',
    textColor: '#3F2E1E',
    mutedColor: '#6B563D',
    button: {
      variant: 'brutal', radius: 0, bg: '#F4EBD9', text: '#3F2E1E', border: '#3F2E1E',
      borderWidth: 2, shadow: 'hard',
    },
    avatar: { shape: 'square', size: 88, ring: true, ringColor: '#3F2E1E' },
    spacing: 14,
  }),

  mk('indigo', 'Índigo', 'Índigo eléctrico sobre lavanda clara', {
    bgColor: '#EEF2FF',
    fontDisplay: 'epilogue',
    fontBody: 'epilogue',
    textColor: '#312E81',
    mutedColor: '#6366F1',
    button: { variant: 'fill', radius: 12, bg: '#4F46E5', text: '#FFFFFF', border: '#4F46E5', shadow: 'soft' },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FFFFFF' },
  }),

  mk('pizarra', 'Pizarra', 'Azul pizarra con botones translúcidos discretos', {
    bgColor: '#1E293B',
    fontDisplay: 'hanken',
    fontBody: 'hanken',
    textColor: '#F1F5F9',
    mutedColor: '#94A3B8',
    button: {
      variant: 'soft', radius: 10, bg: '#FFFFFF0F', text: '#F1F5F9', border: '#475569',
      borderWidth: 1, shadow: 'none',
    },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#475569' },
  }),

  mk('miel', 'Miel', 'Ámbar de miel con Fraunces y píldoras cálidas', {
    bgColor: '#FFFBEB',
    fontDisplay: 'fraunces',
    fontBody: 'work',
    textColor: '#78350F',
    mutedColor: '#B45309',
    button: { variant: 'fill', radius: 999, bg: '#D97706', text: '#FFFBEB', border: '#D97706', shadow: 'soft' },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FDE68A' },
  }),

  mk('lavanda', 'Lavanda', 'Malva suave con botones flotantes blancos', {
    bgType: 'gradient',
    gradFrom: '#EDE9FE',
    gradTo: '#C4B5FD',
    gradAngle: 180,
    fontDisplay: 'outfit',
    fontBody: 'outfit',
    textColor: '#4C1D95',
    mutedColor: '#7C3AED',
    button: { variant: 'fill', radius: 20, bg: '#FFFFFF', text: '#6D28D9', border: '#FFFFFF', shadow: 'soft' },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FFFFFF' },
  }),

  mk('oceano', 'Océano', 'Azul profundo con botones de cristal marino', {
    bgType: 'gradient',
    gradFrom: '#0284C7',
    gradTo: '#0C4A6E',
    gradAngle: 170,
    fontDisplay: 'space',
    fontBody: 'space',
    textColor: '#F0F9FF',
    mutedColor: '#BAE6FD',
    button: {
      variant: 'glass', radius: 999, bg: '#FFFFFF1A', text: '#F0F9FF', border: '#FFFFFF4D',
      borderWidth: 1, shadow: 'none',
    },
    avatar: { shape: 'circle', size: 96, ring: true, ringColor: '#FFFFFF66' },
  }),

  mk('boutique', 'Boutique', 'Marfil de atelier, Instrument Serif y contornos finos', {
    bgColor: '#FAF7F2',
    fontDisplay: 'instrument',
    fontBody: 'hanken',
    textColor: '#1C1917',
    mutedColor: '#78716C',
    button: {
      variant: 'outline', radius: 0, bg: '#00000000', text: '#1C1917', border: '#1C1917',
      borderWidth: 1, shadow: 'none', uppercase: true,
    },
    avatar: { shape: 'square', size: 96, ring: true, ringColor: '#E7E2D9' },
    spacing: 16,
    maxWidth: 400,
  }),

  mk('arcade', 'Arcade', 'Noche de recreativos: amarillo eléctrico con sombra violeta', {
    bgColor: '#18181B',
    fontDisplay: 'syne',
    fontBody: 'space',
    textColor: '#FAFAFA',
    mutedColor: '#A1A1AA',
    button: {
      variant: 'fill', radius: 8, bg: '#FACC15', text: '#18181B', border: '#18181B',
      borderWidth: 2, shadow: 'hard',
    },
    avatar: { shape: 'squircle', size: 92, ring: true, ringColor: '#FACC15' },
    spacing: 14,
  }),

  mk('jardin', 'Jardín', 'Verde claro de invernadero con contornos botánicos', {
    bgType: 'gradient',
    gradFrom: '#F0FDF4',
    gradTo: '#BBF7D0',
    gradAngle: 190,
    fontDisplay: 'cormorant',
    fontBody: 'newsreader',
    textColor: '#14532D',
    mutedColor: '#4D7C5F',
    button: {
      variant: 'outline', radius: 999, bg: '#FFFFFFB3', text: '#166534', border: '#86EFAC',
      borderWidth: 1, shadow: 'soft',
    },
    avatar: { shape: 'circle', size: 100, ring: true, ringColor: '#FFFFFF' },
  }),
]

export const TEMPLATE_MAP: Record<string, Template> = Object.fromEntries(
  TEMPLATES.map((t) => [t.id, t]),
)
