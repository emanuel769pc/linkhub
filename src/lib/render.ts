import type { CSSProperties } from 'react'
import type { Theme } from './types'

// Convierte un Theme en estilos CSS para renderizar la página del cliente

export function backgroundStyle(theme: Theme): CSSProperties {
  if (theme.bgType === 'gradient') {
    return {
      background: `linear-gradient(${theme.gradAngle}deg, ${theme.gradFrom}, ${theme.gradTo})`,
    }
  }
  return { background: theme.bgColor }
}

const SIZES = {
  sm: { padY: 9, padX: 16, fontSize: 14, icon: 17, gap: 8 },
  md: { padY: 13, padX: 20, fontSize: 15, icon: 19, gap: 10 },
  lg: { padY: 16, padX: 24, fontSize: 16, icon: 21, gap: 11 },
} as const

export function buttonStyle(theme: Theme, hovered = false): CSSProperties {
  const b = theme.button
  const s = SIZES[b.size]

  const style: CSSProperties = {
    borderRadius: b.radius >= 900 ? '999px' : `${b.radius}px`,
    paddingTop: s.padY,
    paddingBottom: s.padY,
    paddingLeft: s.padX,
    paddingRight: s.padX,
    fontSize: s.fontSize,
    fontWeight: b.bold ? 700 : 500,
    textTransform: b.uppercase ? 'uppercase' : 'none',
    letterSpacing: b.uppercase ? '0.09em' : '0.005em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: b.align === 'center' ? 'center' : 'flex-start',
    gap: s.gap,
    width: b.width === 'full' ? '100%' : 'auto',
    textDecoration: 'none',
    lineHeight: 1.25,
    border: '1px solid transparent',
  }

  switch (b.variant) {
    case 'fill':
      style.background = b.bg
      style.color = b.text
      if (b.borderWidth > 0) style.border = `${b.borderWidth}px solid ${b.border}`
      break
    case 'outline':
      style.background = b.bg
      style.color = b.text
      style.border = `${Math.max(1, b.borderWidth)}px solid ${b.border}`
      break
    case 'soft':
      style.background = b.bg
      style.color = b.text
      style.border = `${Math.max(1, b.borderWidth)}px solid ${b.border}`
      break
    case 'glass':
      style.background = b.bg
      style.color = b.text
      style.border = `${Math.max(1, b.borderWidth)}px solid ${b.border}`
      style.backdropFilter = 'blur(10px)'
      style.WebkitBackdropFilter = 'blur(10px)'
      break
    case 'brutal':
      style.background = b.bg
      style.color = b.text
      style.border = `${Math.max(2, b.borderWidth)}px solid ${b.border}`
      style.boxShadow = `4px 4px 0 0 ${b.border}`
      break
    case 'underline':
      style.background = 'transparent'
      style.color = b.text
      style.border = 'none'
      style.borderBottom = `${Math.max(1, b.borderWidth)}px solid ${b.border}`
      style.borderRadius = 0
      style.paddingLeft = 4
      style.paddingRight = 4
      break
    case 'pill-glow':
      style.background = b.bg
      style.color = b.text
      style.border = `${Math.max(1, b.borderWidth)}px solid ${b.border}`
      style.boxShadow = `0 0 22px -6px ${b.border}`
      break
  }

  if (b.variant !== 'brutal') {
    if (b.shadow === 'soft') style.boxShadow = '0 8px 20px -10px rgba(0,0,0,.38)'
    if (b.shadow === 'hard') style.boxShadow = `3px 3px 0 0 ${b.border}`
  }

  if (hovered) style.transform = 'translateY(-2px)'

  return style
}

export function avatarStyle(theme: Theme): CSSProperties {
  const a = theme.avatar
  const ring = a.ring ? `0 0 0 3px ${a.ringColor}` : null
  // Sombra suave para que la foto "flote" sobre el fondo en todas las plantillas
  const depth = '0 18px 36px -18px rgba(0,0,0,0.45), 0 6px 14px -8px rgba(0,0,0,0.2)'
  return {
    width: a.size,
    height: a.size,
    borderRadius: a.shape === 'circle' ? '50%' : a.shape === 'squircle' ? '30%' : '4px',
    boxShadow: ring ? `${ring}, ${depth}` : depth,
    objectFit: 'cover',
    flexShrink: 0,
  }
}

export function iconColorFor(theme: Theme): string {
  return theme.button.text
}

export function buttonIconSize(theme: Theme): number {
  return SIZES[theme.button.size].icon
}
