// Generación automática de slugs (la URL pública de cada cliente)

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

/** Garantiza un slug único consultando la base de datos */
export async function uniqueSlug(
  base: string,
  check: (slug: string) => Promise<boolean>,
): Promise<string> {
  const root = slugify(base) || 'pagina'
  let candidate = root
  let n = 2
  // hasta 50 intentos; después usa timestamp
  for (let i = 0; i < 50; i++) {
    const taken = await check(candidate)
    if (!taken) return candidate
    candidate = `${root}-${n++}`
  }
  return `${root}-${Date.now().toString(36).slice(-4)}`
}

/** URL pública completa de una página */
export function publicPageUrl(slug: string): string {
  const base = window.location.origin + import.meta.env.BASE_URL
  return `${base}#/p/${slug}`
}
