import Link from 'next/link'
import Image from 'next/image'
import type { WowClass } from '@/types'
import { RoleBadge } from '@/components/ui/RoleBadge'
import { WOWHEAD_ICON_CDN } from '@/lib/data/classes'

interface ClassCardProps {
  cls: WowClass
  locale: string
}

export function ClassCard({ cls, locale }: ClassCardProps) {
  return (
    <div
      className="group relative bg-surface rounded-lg border border-border hover:border-border hover:bg-elevated transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
      style={{ borderLeftColor: cls.color, borderLeftWidth: '3px' }}
    >
      {/* Subtle color glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
        style={{
          background: `radial-gradient(ellipse at 0% 50%, color-mix(in srgb, ${cls.color} 6%, transparent), transparent 60%)`,
        }}
      />

      <div className="relative p-4">
        {/* Class header */}
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={`${WOWHEAD_ICON_CDN}/${cls.icon}.jpg`}
            alt={cls.name}
            width={40}
            height={40}
            className="rounded-md flex-shrink-0"
            unoptimized
          />
          <span
            className="text-sm font-semibold text-fg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {cls.name}
          </span>
        </div>

        {/* Spec links */}
        <div className="flex flex-wrap gap-1.5">
          {cls.specs.map(spec => (
            <Link
              key={spec.id}
              href={`/${locale}/${cls.id}/${spec.id}`}
              className="group/spec flex items-center gap-1.5 px-2 py-1 rounded bg-base hover:bg-elevated border border-border hover:border-border transition-all duration-150"
            >
              <Image
                src={`${WOWHEAD_ICON_CDN}/${spec.icon}.jpg`}
                alt={spec.name}
                width={18}
                height={18}
                className="rounded"
                unoptimized
              />
              <span className="text-xs text-fg-muted group-hover/spec:text-fg transition-colors">
                {spec.name}
              </span>
              <RoleBadge role={spec.role} locale={locale} size="sm" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
