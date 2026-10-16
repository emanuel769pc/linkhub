// ─────────────────────────────────────────────────────────────
//  Fuentes de Google — catálogo y cargador dinámico
//  Cada plantilla usa sus propias fuentes; solo se descargan
//  las que esa página necesita.
// ─────────────────────────────────────────────────────────────

export interface FontDef {
  id: string
  family: string
  label: string
  category: 'sans' | 'serif' | 'display' | 'mono'
  /** consulta exacta para Google Fonts */
  q: string
}

const W = 'wght@400;500;600;700'

export const FONTS: FontDef[] = [
  // Sans
  { id: 'sora', family: 'Sora', label: 'Sora', category: 'sans', q: `Sora:wght@400;500;600;700;800` },
  { id: 'hanken', family: 'Hanken Grotesk', label: 'Hanken Grotesk', category: 'sans', q: `Hanken+Grotesk:${W}` },
  { id: 'space', family: 'Space Grotesk', label: 'Space Grotesk', category: 'sans', q: `Space+Grotesk:${W}` },
  { id: 'outfit', family: 'Outfit', label: 'Outfit', category: 'sans', q: `Outfit:wght@400;500;600;700;800` },
  { id: 'manrope', family: 'Manrope', label: 'Manrope', category: 'sans', q: `Manrope:${W}` },
  { id: 'archivo', family: 'Archivo', label: 'Archivo', category: 'sans', q: `Archivo:${W}` },
  { id: 'epilogue', family: 'Epilogue', label: 'Epilogue', category: 'sans', q: `Epilogue:${W}` },
  { id: 'work', family: 'Work Sans', label: 'Work Sans', category: 'sans', q: `Work+Sans:${W}` },
  // Serif
  { id: 'fraunces', family: 'Fraunces', label: 'Fraunces', category: 'serif', q: `Fraunces:${W}` },
  { id: 'playfair', family: 'Playfair Display', label: 'Playfair Display', category: 'serif', q: `Playfair+Display:${W}` },
  { id: 'newsreader', family: 'Newsreader', label: 'Newsreader', category: 'serif', q: `Newsreader:${W}` },
  { id: 'instrument', family: 'Instrument Serif', label: 'Instrument Serif', category: 'serif', q: `Instrument+Serif` },
  { id: 'cormorant', family: 'Cormorant Garamond', label: 'Cormorant', category: 'serif', q: `Cormorant+Garamond:${W}` },
  { id: 'lora', family: 'Lora', label: 'Lora', category: 'serif', q: `Lora:${W}` },
  // Display
  { id: 'bricolage', family: 'Bricolage Grotesque', label: 'Bricolage', category: 'display', q: `Bricolage+Grotesque:${W}` },
  { id: 'syne', family: 'Syne', label: 'Syne', category: 'display', q: `Syne:wght@400;500;600;700;800` },
  { id: 'dmserif', family: 'DM Serif Display', label: 'DM Serif', category: 'display', q: `DM+Serif+Display` },
  // Mono
  { id: 'spacemono', family: 'Space Mono', label: 'Space Mono', category: 'mono', q: `Space+Mono:${W}` },
  { id: 'plexmono', family: 'IBM Plex Mono', label: 'IBM Plex Mono', category: 'mono', q: `IBM+Plex+Mono:${W}` },
]

export const FONT_MAP: Record<string, FontDef> = Object.fromEntries(FONTS.map((f) => [f.id, f]))

export function fontFamily(id: string): string {
  const f = FONT_MAP[id]
  if (!f) return 'system-ui, sans-serif'
  const fallback =
    f.category === 'serif' ? 'Georgia, serif' : f.category === 'mono' ? 'ui-monospace, monospace' : 'system-ui, sans-serif'
  return `'${f.family}', ${fallback}`
}

// Inyecta el <link> de Google Fonts una sola vez por familia
const loaded = new Set<string>()

export function loadFont(id: string): void {
  const f = FONT_MAP[id]
  if (!f || loaded.has(id)) return
  loaded.add(id)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${f.q}&display=swap`
  document.head.appendChild(link)
}

export function loadFonts(ids: Array<string | undefined>): void {
  ids.forEach((id) => id && loadFont(id))
}
