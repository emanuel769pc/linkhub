import { type ReactNode } from 'react'

// ─────────────────────────────────────────────────────────────
//  Controles reutilizables del panel de administración
// ─────────────────────────────────────────────────────────────

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-mute">{hint}</span> : null}
    </label>
  )
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
  onBlur,
  disabled,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  maxLength?: number
  onBlur?: () => void
  disabled?: boolean
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onBlur={onBlur}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
    />
  )
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (v: T) => void
  options: Array<{ value: T; label: ReactNode; title?: string }>
}) {
  return (
    <div className="inline-flex w-full rounded-xl border border-line bg-white p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          title={o.title}
          onClick={() => onChange(o.value)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition ${
            value === o.value
              ? 'bg-ink text-white shadow-sm'
              : 'text-ink-soft hover:bg-paper'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  unit = 'px',
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink-soft">{label}</span>
        <span className="rounded-md bg-paper px-2 py-0.5 text-xs tabular-nums text-ink-soft">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand"
      />
    </div>
  )
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-3 py-2">
      <span className="text-[13px] font-medium text-ink-soft">{label}</span>
      <span className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 rounded-md border border-line px-1.5 py-0.5 text-right font-mono text-xs text-ink-soft"
        />
        <input
          type="color"
          value={value.slice(0, 7)}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-9"
        />
      </span>
    </div>
  )
}

export function Toggle({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  hint?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-xl border border-line bg-white px-3 py-2.5 text-left transition hover:border-line-strong"
    >
      <span>
        <span className="block text-[13px] font-semibold text-ink-soft">{label}</span>
        {hint ? <span className="block text-xs text-mute">{hint}</span> : null}
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? 'bg-brand' : 'bg-line-strong'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </span>
    </button>
  )
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-3">
      <h3 className="font-display text-[13px] font-bold tracking-wide text-ink uppercase">
        {children}
      </h3>
      {hint ? <p className="mt-0.5 text-xs text-mute">{hint}</p> : null}
    </div>
  )
}

export function Btn({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'soft' | 'danger'
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand-deep shadow-sm',
    soft: 'bg-brand-soft text-brand hover:bg-brand/15',
    ghost: 'text-ink-soft hover:bg-paper border border-line bg-white',
    danger: 'bg-white text-danger border border-line hover:bg-red-50',
  }[variant]
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
    >
      {children}
    </button>
  )
}
