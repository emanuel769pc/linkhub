import { useEffect, type CSSProperties } from 'react'
import { AlignCenter, AlignLeft, ArrowLeftRight } from 'lucide-react'
import type { usePageEditor } from '../../../hooks/usePageEditor'
import type { ButtonTheme, ButtonVariant, Theme } from '../../../lib/types'
import { FONTS, FONT_MAP, fontFamily, loadFonts } from '../../../lib/fonts'
import { ColorField, SectionTitle, Segmented, SliderRow, Toggle } from '../ui'

type Editor = ReturnType<typeof usePageEditor>

export function DesignSection({ editor }: { editor: Editor }) {
  const { page } = editor
  const theme = page?.theme

  // carga todas las fuentes del catálogo para que la vista previa del selector sea real
  useEffect(() => {
    loadFonts(FONTS.map((f) => f.id))
  }, [])

  if (!theme) return null

  const patch = (p: Partial<Theme>) => editor.setTheme({ ...theme, ...p })
  const patchBtn = (p: Partial<ButtonTheme>) =>
    editor.setTheme({ ...theme, button: { ...theme.button, ...p } })

  const b = theme.button
  const a = theme.avatar

  return (
    <div className="space-y-7">
      {/* ── FONDO ── */}
      <section>
        <SectionTitle>Fondo</SectionTitle>
        <Segmented
          value={theme.bgType}
          onChange={(v) => patch({ bgType: v })}
          options={[
            { value: 'solid', label: 'Color sólido' },
            { value: 'gradient', label: 'Degradado' },
          ]}
        />
        <div className="mt-3 space-y-2">
          {theme.bgType === 'solid' ? (
            <ColorField
              label="Color de fondo"
              value={theme.bgColor}
              onChange={(v) => patch({ bgColor: v })}
            />
          ) : (
            <>
              <ColorField
                label="Desde"
                value={theme.gradFrom}
                onChange={(v) => patch({ gradFrom: v })}
              />
              <ColorField
                label="Hasta"
                value={theme.gradTo}
                onChange={(v) => patch({ gradTo: v })}
              />
              <SliderRow
                label="Ángulo"
                value={theme.gradAngle}
                min={0}
                max={360}
                unit="°"
                onChange={(v) => patch({ gradAngle: v })}
              />
            </>
          )}
        </div>
      </section>

      {/* ── TIPOGRAFÍA ── */}
      <section>
        <SectionTitle>Tipografía</SectionTitle>
        <div className="space-y-3">
          <FontSelect
            label="Títulos y nombre"
            value={theme.fontDisplay}
            onChange={(v) => patch({ fontDisplay: v })}
          />
          <FontSelect
            label="Botones y textos"
            value={theme.fontBody}
            onChange={(v) => patch({ fontBody: v })}
          />
        </div>
      </section>

      {/* ── COLORES DE TEXTO ── */}
      <section>
        <SectionTitle>Colores de texto</SectionTitle>
        <div className="space-y-2">
          <ColorField
            label="Texto principal"
            value={theme.textColor}
            onChange={(v) => patch({ textColor: v })}
          />
          <ColorField
            label="Texto secundario"
            value={theme.mutedColor}
            onChange={(v) => patch({ mutedColor: v })}
          />
        </div>
      </section>

      {/* ── BOTONES ── */}
      <section>
        <SectionTitle>Botones</SectionTitle>

        <VariantPicker value={b.variant} onChange={(v) => patchBtn({ variant: v })} />

        <div className="mt-4 space-y-3">
          <SliderRow
            label="Redondeo de esquinas"
            value={b.radius >= 900 ? 30 : b.radius}
            min={0}
            max={30}
            onChange={(v) => patchBtn({ radius: v })}
          />
          <button
            type="button"
            onClick={() => patchBtn({ radius: b.radius >= 900 ? 14 : 999 })}
            className={`w-full rounded-xl border px-3 py-2 text-[13px] font-semibold transition ${
              b.radius >= 900
                ? 'border-brand bg-brand-soft text-brand'
                : 'border-line bg-white text-ink-soft hover:border-line-strong'
            }`}
          >
            {b.radius >= 900 ? '✓ Forma pastilla activada' : 'Hacer forma pastilla'}
          </button>

          <Segmented
            value={b.size}
            onChange={(v) => patchBtn({ size: v })}
            options={[
              { value: 'sm', label: 'Pequeño' },
              { value: 'md', label: 'Mediano' },
              { value: 'lg', label: 'Grande' },
            ]}
          />

          <ColorField label="Fondo del botón" value={b.bg} onChange={(v) => patchBtn({ bg: v })} />
          <ColorField label="Texto del botón" value={b.text} onChange={(v) => patchBtn({ text: v })} />
          <ColorField
            label="Borde"
            value={b.border}
            onChange={(v) => patchBtn({ border: v })}
          />
          <SliderRow
            label="Grosor del borde"
            value={b.borderWidth}
            min={0}
            max={4}
            onChange={(v) => patchBtn({ borderWidth: v })}
          />

          <div>
            <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Sombra</span>
            <Segmented
              value={b.shadow}
              onChange={(v) => patchBtn({ shadow: v })}
              options={[
                { value: 'none', label: 'Ninguna' },
                { value: 'soft', label: 'Suave' },
                { value: 'hard', label: 'Dura' },
              ]}
            />
          </div>

          <Segmented
            value={b.width}
            onChange={(v) => patchBtn({ width: v })}
            options={[
              { value: 'full', label: 'Ancho completo' },
              { value: 'auto', label: 'Ajustado al texto' },
            ]}
          />

          <Segmented
            value={b.align}
            onChange={(v) => patchBtn({ align: v })}
            options={[
              {
                value: 'center',
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    <AlignCenter size={14} /> Centrado
                  </span>
                ),
              },
              {
                value: 'left',
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    <AlignLeft size={14} /> Izquierda
                  </span>
                ),
              },
            ]}
          />

          <Segmented
            value={b.iconBefore ? 'before' : 'after'}
            onChange={(v) => patchBtn({ iconBefore: v === 'before' })}
            options={[
              { value: 'before', label: 'Icono a la izquierda' },
              { value: 'after', label: 'Icono a la derecha' },
            ]}
          />

          <div className="grid grid-cols-2 gap-2">
            <Toggle
              label="Mayúsculas"
              checked={b.uppercase}
              onChange={(v) => patchBtn({ uppercase: v })}
            />
            <Toggle
              label="Texto en negrita"
              checked={b.bold}
              onChange={(v) => patchBtn({ bold: v })}
            />
          </div>
        </div>
      </section>

      {/* ── FOTO DE PERFIL ── */}
      <section>
        <SectionTitle>Foto de perfil</SectionTitle>
        <Segmented
          value={a.shape}
          onChange={(v) => patch({ avatar: { ...a, shape: v } })}
          options={[
            { value: 'circle', label: 'Círculo' },
            { value: 'squircle', label: 'Suave' },
            { value: 'square', label: 'Cuadrado' },
          ]}
        />
        <div className="mt-3 space-y-3">
          <SliderRow
            label="Tamaño"
            value={a.size}
            min={64}
            max={140}
            onChange={(v) => patch({ avatar: { ...a, size: v } })}
          />
          <div className="grid grid-cols-2 gap-2">
            <Toggle
              label="Aro alrededor"
              checked={a.ring}
              onChange={(v) => patch({ avatar: { ...a, ring: v } })}
            />
            <ColorField
              label="Color del aro"
              value={a.ringColor}
              onChange={(v) => patch({ avatar: { ...a, ringColor: v } })}
            />
          </div>
        </div>
      </section>

      {/* ── DISTRIBUCIÓN ── */}
      <section>
        <SectionTitle>Distribución</SectionTitle>
        <div className="space-y-3">
          <SliderRow
            label="Separación entre botones"
            value={theme.spacing}
            min={6}
            max={28}
            onChange={(v) => patch({ spacing: v })}
          />
          <SliderRow
            label="Ancho del contenido"
            value={theme.maxWidth}
            min={340}
            max={560}
            onChange={(v) => patch({ maxWidth: v })}
          />
          <Segmented
            value={theme.align}
            onChange={(v) => patch({ align: v })}
            options={[
              {
                value: 'center',
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    <AlignCenter size={14} /> Todo centrado
                  </span>
                ),
              },
              {
                value: 'left',
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    <AlignLeft size={14} /> Alineado a la izquierda
                  </span>
                ),
              },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

// ── Selector de fuente con vista previa ───────────────────────

function FontSelect({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const current = FONT_MAP[value]
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
      >
        {(['sans', 'serif', 'display', 'mono'] as const).map((cat) => (
          <optgroup
            key={cat}
            label={{
              sans: 'Sans serif',
              serif: 'Serif',
              display: 'Display',
              mono: 'Monoespaciada',
            }[cat]}
          >
            {FONTS.filter((f) => f.category === cat).map((f) => (
              <option key={f.id} value={f.id} style={{ fontFamily: `'${f.family}', sans-serif` }}>
                {f.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <p
        className="mt-1.5 rounded-xl bg-paper px-3 py-2 text-[15px]"
        style={{ fontFamily: fontFamily(current?.id ?? value) }}
      >
        Café Milagros — Abierto hoy
      </p>
    </div>
  )
}

// ── Selector visual del estilo de botón ───────────────────────

const VARIANT_OPTIONS: Array<{ value: ButtonVariant; label: string }> = [
  { value: 'fill', label: 'Relleno' },
  { value: 'outline', label: 'Borde' },
  { value: 'soft', label: 'Tenue' },
  { value: 'glass', label: 'Cristal' },
  { value: 'brutal', label: 'Marco' },
  { value: 'underline', label: 'Línea' },
  { value: 'pill-glow', label: 'Brillo' },
]

function VariantPicker({
  value,
  onChange,
}: {
  value: ButtonVariant
  onChange: (v: ButtonVariant) => void
}) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {VARIANT_OPTIONS.map((v) => {
        const active = value === v.value
        return (
          <button
            key={v.value}
            type="button"
            onClick={() => onChange(v.value)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border px-1.5 py-2 transition ${
              active ? 'border-brand bg-brand-soft' : 'border-line bg-white hover:border-line-strong'
            }`}
          >
            <span
              className="flex h-6 w-full items-center justify-center"
              aria-hidden="true"
            >
              <span style={sampleStyle(v.value)} className="h-3.5 w-9 rounded-[5px]" />
            </span>
            <span
              className={`text-[10.5px] font-semibold ${active ? 'text-brand' : 'text-mute'}`}
            >
              {v.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function sampleStyle(v: ButtonVariant): CSSProperties {
  const ink = '#17181a'
  switch (v) {
    case 'fill':
      return { background: ink }
    case 'outline':
      return { background: 'transparent', border: `1.5px solid ${ink}`, borderRadius: 999 }
    case 'soft':
      return { background: `${ink}14`, border: `1px solid ${ink}24` }
    case 'glass':
      return {
        background: `${ink}0d`,
        border: `1px solid ${ink}33`,
        backdropFilter: 'blur(3px)',
      }
    case 'brutal':
      return {
        background: 'white',
        border: `1.5px solid ${ink}`,
        borderRadius: 3,
        boxShadow: `2px 2px 0 0 ${ink}`,
      }
    case 'underline':
      return {
        background: 'transparent',
        borderBottom: `1.5px solid ${ink}`,
        borderRadius: 0,
      }
    case 'pill-glow':
      return {
        background: `${ink}0f`,
        border: `1px solid ${ink}55`,
        borderRadius: 999,
        boxShadow: `0 0 8px -1px ${ink}66`,
      }
  }
}
