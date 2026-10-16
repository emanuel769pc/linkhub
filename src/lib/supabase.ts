import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim()
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim()

export const isSupabaseConfigured = Boolean(
  url && anonKey && url.startsWith('https://') && !/tu-proyecto/i.test(url),
)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null

export function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase no está configurado. Copia .env.example a .env y agrega tu URL y clave anon.',
    )
  }
  return supabase
}

// URL pública de una foto de perfil guardada en el bucket "avatars"
export function avatarUrl(path: string | null | undefined): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  if (!supabase) return null
  return supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl
}
