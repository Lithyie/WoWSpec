import type { Role } from '@/types'

const ROLE_CONFIG: Record<Role, { label: { en: string; fr: string }; color: string }> = {
  tank: { label: { en: 'Tank', fr: 'Tank' }, color: 'var(--color-tank)' },
  healer: { label: { en: 'Healer', fr: 'Soigneur' }, color: 'var(--color-healer)' },
  melee_dps: { label: { en: 'Melee', fr: 'Mêlée' }, color: 'var(--color-melee)' },
  ranged_dps: { label: { en: 'Ranged', fr: 'Distance' }, color: 'var(--color-ranged)' },
}

interface RoleBadgeProps {
  role: Role
  locale?: string
  size?: 'sm' | 'md'
}

export function RoleBadge({ role, locale = 'en', size = 'sm' }: RoleBadgeProps) {
  const config = ROLE_CONFIG[role]
  const label = locale === 'fr' ? config.label.fr : config.label.en

  return (
    <span
      className={[
        'inline-flex items-center font-semibold uppercase tracking-wider rounded',
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
      ].join(' ')}
      style={{
        color: config.color,
        backgroundColor: `color-mix(in srgb, ${config.color} 12%, transparent)`,
        border: `1px solid color-mix(in srgb, ${config.color} 25%, transparent)`,
      }}
    >
      {label}
    </span>
  )
}
