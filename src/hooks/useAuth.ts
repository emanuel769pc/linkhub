import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [checking, setChecking] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return
    let alive = true
    supabase.auth.getSession().then(({ data }) => {
      if (alive) {
        setSession(data.session)
        setChecking(false)
      }
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setChecking(false)
    })
    return () => {
      alive = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase no está configurado')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(traduceAuthError(error.message))
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return { session, checking, signIn, signOut }
}

function traduceAuthError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'Email o contraseña incorrectos.'
  if (msg.includes('Email not confirmed')) return 'Confirma tu email antes de entrar.'
  if (msg.includes('Failed to fetch')) return 'Sin conexión con Supabase. Revisa tu URL y conexión a internet.'
  return msg
}
