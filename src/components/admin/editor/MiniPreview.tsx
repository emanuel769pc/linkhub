import type { CSSProperties } from 'react'
import type { Theme } from '../../../lib/types'
import { backgroundStyle } from '../../../lib/render'

// Miniatura estilizada de una página según su tema.
// Se usa en la galería de plantillas.

export function MiniPreview({
  theme,
  className = '',
  height = 150,
}: {
  theme: Theme
  className?: string
  height?: number
}) {
  const b = theme.button
  const a = theme.avatar

  const miniBtn: CSSProperties = {
    width: b.width === 'full' ? '76%' : '52%',
    height: 13,
    borderRadius: b.radius >= 900 ? 999 : Math.min(b.radius, 8),
    background:
      b.variant === 'outline' || b.variant === 'underline' ? 'transparent' : b.bg,
    border:
      b.variant === 'underline'
        ? 'none'
        : `${Math.min(2, Math.max(1, Math.round(b.borderWidth)))}px solid ${b.border}`,
    borderBottom:
      b.variant === 'underline' ? `1.5px solid ${b.border}` : undefined,
    boxShadow:
      b.variant === 'brutal'
        ? `2.5px 2.5px 0 0 ${b.border}`
        : b.shadow === 'soft'
          ? '0 3px 7px -3px rgba(0,0,0,.4)'
          : undefined,
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ ...backgroundStyle(theme), height }}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-3 flex flex-col items-center gap-2">
        <div
          style={{
            width: Math.min(26, a.size / 3.4),
            height: Math.min(26, a.size / 3.4),
            borderRadius: a.shape === 'circle' ? '50%' : a.shape === 'squircle' ? '30%' : '3px',
            background: `${theme.textColor}26`,
            boxShadow: a.ring ? `0 0 0 2px ${a.ringColor}` : undefined,
          }}
        />
        <div
          style={{
            width: 58,
            height: 6,
            borderRadius: 3,
            background: theme.textColor,
            opacity: 0.85,
          }}
        />
        <div
          style={{
            width: 40,
            height: 3,
            borderRadius: 2,
            background: theme.mutedColor,
            opacity: 0.6,
          }}
        />
        <div
          className="mt-1 flex flex-col items-center gap-[5px]"
          style={{ width: '100%' }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={miniBtn} />
          ))}
        </div>
      </div>
    </div>
  )
}
