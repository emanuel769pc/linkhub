import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, X } from 'lucide-react'
import { requireSupabase } from '../../lib/supabase'
import { slugify } from '../../lib/slug'
import { suggestSlug } from '../../hooks/usePageEditor'
import { TEMPLATE_MAP } from '../../lib/templates'
import { Btn, Field, TextInput } from './ui'

export function NewPagePage() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [tagline, setTagline] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const slugPreview = slugify(name) || 'nombre-del-cliente'

  const pickFile = (f: File | null) => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(f)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setBusy(true)
    setError(null)
    try {
      const sb = requireSupabase()
      const slug = await suggestSlug(name)
      const { data, error: insErr } = await sb
        .from('pages')
        .insert({
          slug,
          client_name: name.trim(),
          tagline: tagline.trim() || null,
          template_id: 'estudio',
          theme: TEMPLATE_MAP['estudio'].theme,
          published: true,
        })
        .select()
        .single()
      if (insErr) throw new Error(insErr.message)

      if (file && data) {
        const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase()
        const path = `${data.id}/${crypto.randomUUID()}.${ext}`
        const { error: upErr } = await sb.storage.from('avatars').upload(path, file)
        if (!upErr) {
          await sb.from('pages').update({ avatar_path: path }).eq('id', data.id)
        }
      }

      nav(`/editar/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la página')
      setBusy(false)
    }
  }

  return (
    <div className="min-h-full">
      <header className="border-b border-line bg-panel">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-6 py-4">
          <Link to="/panel" className="rounded-lg p-1.5 text-ink-soft hover:bg-paper">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display text-lg font-bold">Nueva página</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <form onSubmit={submit} className="space-y-6 rounded-3xl border border-line bg-panel p-6 sm:p-8">
          <Field label="Nombre del cliente, empresa o local *">
            <TextInput
              value={name}
              onChange={setName}
              placeholder="Ej. Café Milagros"
              maxLength={60}
            />
          </Field>

          <Field label="Descripción breve" hint="Una línea que aparecerá debajo del nombre (opcional)">
            <TextInput
              value={tagline}
              onChange={setTagline}
              placeholder="Ej. Café de especialidad · Centro histórico"
              maxLength={90}
            />
          </Field>

          <div>
            <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
              Foto de perfil
            </span>
            <div className="flex items-center gap-4">
              {preview ? (
                <span className="relative">
                  <img src={preview} alt="" className="h-16 w-16 rounded-full object-cover" />
                  <button
                    type="button"
                    onClick={() => pickFile(null)}
                    className="absolute -top-1 -right-1 rounded-full bg-ink p-1 text-white"
                    title="Quitar foto"
                  >
                    <X size={11} />
                  </button>
                </span>
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-mute">
                  <Camera size={22} />
                </span>
              )}
              <label className="cursor-pointer rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-line-strong">
                {preview ? 'Cambiar foto' : 'Subir foto'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl bg-paper px-4 py-3.5">
            <p className="text-[13px] font-semibold text-ink-soft">Su enlace se creará solo:</p>
            <p className="mt-1 truncate font-mono text-sm text-brand">
              …/#/p/{slugPreview}
            </p>
            <p className="mt-1 text-xs text-mute">
              Si ya existe, se ajustará automáticamente. Podrás editarlo después.
            </p>
          </div>

          {error ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-danger">{error}</p>
          ) : null}

          <div className="flex items-center justify-between gap-3 pt-1">
            <p className="text-xs text-mute">
              Empezará con la plantilla <span className="font-semibold">Estudio</span>; podrás
              cambiarla cuando quieras.
            </p>
            <Btn type="submit" disabled={busy || !name.trim()}>
              {busy ? 'Creando…' : 'Crear y editar'}
            </Btn>
          </div>
        </form>
      </main>
    </div>
  )
}
