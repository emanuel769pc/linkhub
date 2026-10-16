import { useEffect } from 'react'
import type { PageRow, Theme } from '../../lib/types'
import { fontFamily, loadFonts } from '../../lib/fonts'
import { avatarStyle, backgroundStyle, buttonIconSize, buttonStyle } from '../../lib/render'
import { IconView } from '../../lib/icons'
import { avatarUrl } from '../../lib/supabase'

// Vista de la página del cliente. Se usa en:
//  1) la ruta pública  /#/p/:slug
//  2) la vista previa en vivo del editor

interface Props {
  page: Pick<PageRow, 'client_name' | 'tagline' | 'avatar_path'>
  theme: Theme
  links: Array<{
    id?: string | null
    key?: string
    label: string
    url: string
    icon: string
  }>
  /** vista previa: desactiva enlaces y muestra contorno */
  preview?: boolean
}

export function LinkPageView({ page, theme, links, preview = false }: Props) {
  useEffect(() => {
    loadFonts([theme.fontDisplay, theme.fontBody])
  }, [theme.fontDisplay, theme.fontBody])

  const img = avatarUrl(page.avatar_path)
  const a = theme.avatar
  const align = theme.align === 'center' ? 'center' : 'left'

  return (
    <div className="min-h-full w-full" style={backgroundStyle(theme)}>
      <div
        className="mx-auto flex min-h-full flex-col"
        style={{
          maxWidth: theme.maxWidth,
          padding: 'clamp(40px, 9vh, 72px) 22px 28px',
          fontFamily: fontFamily(theme.fontBody),
          color: theme.textColor,
          textAlign: align,
        }}
      >
        <div
          className="flex flex-col"
          style={{ alignItems: align === 'center' ? 'center' : 'flex-start' }}
        >
          {img ? (
            <img src={img} alt={page.client_name} style={avatarStyle(theme)} />
          ) : (
            <div
              className="flex items-center justify-center"
              style={{
                ...avatarStyle(theme),
                background: `${theme.textColor}18`,
                fontSize: a.size * 0.42,
                fontWeight: 600,
                fontFamily: fontFamily(theme.fontDisplay),
              }}
            >
              {page.client_name.trim().charAt(0).toUpperCase() || '•'}
            </div>
          )}

          <h1
            className="mt-5"
            style={{
              fontFamily: fontFamily(theme.fontDisplay),
              fontSize: 27,
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            {page.client_name}
          </h1>

          {page.tagline ? (
            <p
              style={{
                color: theme.mutedColor,
                fontSize: 15,
                marginTop: 8,
                lineHeight: 1.5,
                maxWidth: 320,
              }}
            >
              {page.tagline}
            </p>
          ) : null}
        </div>

        <nav
          className="flex flex-col"
          style={{
            marginTop: 30,
            gap: theme.spacing,
            alignItems:
              theme.button.width === 'full'
                ? 'stretch'
                : align === 'center'
                  ? 'center'
                  : 'flex-start',
          }}
        >
          {links.map((l, i) => (
            <a
              key={l.key ?? l.id ?? i}
              href={preview ? undefined : l.url}
              onClick={preview ? (e) => e.preventDefault() : undefined}
              target={preview ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="lh-btn"
              style={buttonStyle(theme)}
            >
              {theme.button.iconBefore && <IconView icon={l.icon} size={buttonIconSize(theme)} />}
              <span>{l.label}</span>
              {!theme.button.iconBefore && (
                <IconView icon={l.icon} size={buttonIconSize(theme)} />
              )}
            </a>
          ))}
          {links.length === 0 && (
            <p
              style={{
                color: theme.mutedColor,
                fontSize: 14,
                textAlign: 'center',
                padding: '18px 0',
              }}
            >
              Aún no hay botones. Agrega el primero desde el panel.
            </p>
          )}
        </nav>

        <div className="mt-auto pt-10" style={{ textAlign: align }}>
          {preview ? null : (
            <a
              href={import.meta.env.BASE_URL}
              style={{
                color: theme.mutedColor,
                fontSize: 12,
                textDecoration: 'none',
                opacity: 0.75,
              }}
            >
              Hecho con LinkHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
