import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Database } from 'lucide-react'
import { DashboardPage } from './DashboardPage'
import { useAuth } from '../../hooks/useAuth'
import { isSupabaseConfigured } from '../../lib/supabase'
import { Btn, Field, TextInput } from './ui'

export function AdminPage() {
  const { session, checking, signIn } = useAuth()

  if (!isSupabaseConfigured) return <SetupNotice />
  if (checking) {
    return (
      <div className="flex min-h-full items-center justify-center bg-paper">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-line-strong border-t-brand" />
      </div>
    )
  }
  if (!session) return <LoginView signIn={signIn} />
  return <DashboardPage />
}

// ── Aviso cuando Supabase aún no está conectado ───────────────

function SetupNotice() {
  const steps = [
    {
      n: 1,
      text: 'Crea tu proyecto gratis en supabase.com (región más cercana, plan Free).',
    },
    {
      n: 2,
      text: 'Abre el SQL Editor del proyecto, pega todo el contenido de supabase/schema.sql y pulsa Run.',
    },
    {
      n: 3,
      text: 'Copia .env.example como .env y pega tu Project URL y tu anon key (Project Settings → API).',
    },
    {
      n: 4,
      text: 'Crea tu usuario de administrador en Authentication → Users → Add user.',
    },
    {
      n: 5,
      text: 'Reinicia el servidor (Ctrl+C y de nuevo npm run dev).',
    },
  ]

  return (
    <div className="flex min-h-full items-center justify-center bg-paper px-6 py-16">
      <div className="w-full max-w-xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <Database size={22} />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold">Conecta tu base de datos</h1>
            <p className="text-sm text-mute">Solo una vez, son unos minutos.</p>
          </div>
        </div>

        <ol className="space-y-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex gap-4 rounded-2xl border border-line bg-panel px-4 py-3.5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[13px] font-bold text-white">
                {s.n}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-center text-sm text-mute">
          ¿Ya está listo?{' '}
          <button
            className="font-semibold text-brand hover:underline"
            onClick={() => window.location.reload()}
          >
            Recargar esta página
          </button>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link to="/" className="text-mute hover:underline">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  )
}

// ── Inicio de sesión ──────────────────────────────────────────

function LoginView({ signIn }: { signIn: (email: string, password: string) => Promise<void> }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-paper px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight">
            Link<span className="text-brand">Hub</span>
          </Link>
          <p className="mt-2 text-sm text-mute">Entra para administrar las páginas de tus clientes</p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-line bg-panel p-6 shadow-sm"
        >
          <Field label="Email">
            <TextInput
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="tu@email.com"
            />
          </Field>
          <Field label="Contraseña">
            <TextInput
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
            />
          </Field>

          {error ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-danger">{error}</p>
          ) : null}

          <Btn type="submit" disabled={busy || !email || !password} className="w-full">
            {busy ? 'Entrando…' : 'Entrar'}
          </Btn>
        </form>

        <p className="mt-5 text-center text-xs leading-relaxed text-mute">
          ¿Primera vez? Crea tu usuario en Supabase →{' '}
          <span className="font-semibold">Authentication → Users → Add user</span>
        </p>
      </div>
    </div>
  )
}
