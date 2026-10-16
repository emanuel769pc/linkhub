import { useEffect, useState } from 'react'
import { Camera, Check, Copy, ExternalLink, X } from 'lucide-react'
import type { usePageEditor } from '../../../hooks/usePageEditor'
import { isSlugTaken } from '../../../hooks/usePageEditor'
import { publicPageUrl, slugify } from '../../../lib/slug'
import { Field, TextInput } from '../ui'

type Editor = ReturnType<typeof usePageEditor>

export function ProfileSection({ editor }: { editor: Editor }) {
  const { page } = editor
  const [slugInput, setSlugInput] = useState(page?.slug ?? '')
  const [slugError, setSlugError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (page) setSlugInput(page.slug)
  }, [page?.slug, page?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!page) return null

  const img = editor.avatarPublicUrl

  const commitSlug = async () => {
    const s = slugify(slugInput)
    if (!s) {
      setSlugError('El enlace no puede quedar vacío')
      return
    }
    if (s === page.slug) {
      setSlugInput(s)
      setSlugError(null)
      return
    }
    const taken = await isSlugTaken(s, page.id)
    if (taken) {
      setSlugError('Ese enlace ya está en uso. Prueba con otro.')
      return
    }
    setSlugError(null)
    setSlugInput(s)
    editor.updatePage({ slug: s })
  }

  const copy = async () => {
    await navigator.clipboard.writeText(publicPageUrl(page.slug))
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const onFile = async (f: File | null) => {
    if (!f) return
    setUploading(true)
    await editor.uploadAvatar(f)
    setUploading(false)
  }

  return (
    <div className="space-y-5">
      <Field label="Nombre del cliente, empresa o local">
        <TextInput
          value={page.client_name}
          onChange={(v) => editor.updatePage({ client_name: v })}
          maxLength={60}
        />
      </Field>

      <Field label="Descripción breve" hint="Aparece debajo del nombre">
        <TextInput
          value={page.tagline ?? ''}
          onChange={(v) => editor.updatePage({ tagline: v || null })}
          placeholder="Ej. Café de especialidad · Centro histórico"
          maxLength={90}
        />
      </Field>

      <div>
        <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
          Foto de perfil
        </span>
        <div className="flex items-center gap-4">
          {img ? (
            <img src={img} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-mute">
              <Camera size={22} />
            </span>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="cursor-pointer rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-line-strong">
              {uploading ? 'Subiendo…' : img ? 'Cambiar foto' : 'Subir foto'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {img ? (
              <button
                type="button"
                onClick={() => editor.removeAvatar()}
                className="inline-flex items-center gap-1 text-xs font-semibold text-mute hover:text-danger"
              >
                <X size={12} />
                Quitar foto
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
          Enlace público
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-paper px-3 py-2 font-mono text-xs text-mute">#/p/</span>
          <TextInput
            value={slugInput}
            onChange={(v) => setSlugInput(v)}
            onBlur={() => void commitSlug()}
          />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => void copy()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft transition hover:border-line-strong"
          >
            {copied ? <Check size={13} className="text-ok" /> : <Copy size={13} />}
            {copied ? '¡Copiado!' : 'Copiar enlace'}
          </button>
          <a
            href={publicPageUrl(page.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft transition hover:border-line-strong"
          >
            <ExternalLink size={13} />
            Abrir
          </a>
        </div>
        {slugError ? (
          <p className="mt-2 text-xs font-semibold text-danger">{slugError}</p>
        ) : (
          <p className="mt-2 text-xs text-mute">
            Se creó solo a partir del nombre. Si lo cambias, el enlace anterior dejará de
            funcionar.
          </p>
        )}
      </div>
    </div>
  )
}
