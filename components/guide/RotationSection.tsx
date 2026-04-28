import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { RotationItem } from '@/types'
import { SectionTitle } from './SectionTitle'
import { WOWHEAD_ICON_CDN } from '@/lib/data/classes'

interface RotationGroupProps {
  title: string
  items: RotationItem[]
  accent?: boolean
}

function RotationGroup({ title, items, accent }: RotationGroupProps) {
  if (!items.length) return null
  return (
    <div>
      <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${accent ? 'text-gold' : 'text-fg-muted'}`}>
        {title}
      </h3>
      <ol className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface border border-border hover:bg-elevated transition-colors duration-150"
          >
            <span className="w-5 text-right text-xs text-fg-subtle font-mono flex-shrink-0">
              {i + 1}
            </span>
            {item.icon && (
              <Image
                src={`${WOWHEAD_ICON_CDN}/${item.icon}.jpg`}
                alt={item.spell}
                width={28}
                height={28}
                className="rounded flex-shrink-0"
                unoptimized
              />
            )}
            <div className="flex-1 min-w-0">
              <span className="text-sm text-fg">{item.spell}</span>
              {item.condition && (
                <span className="block text-xs text-fg-subtle italic mt-0.5">
                  {item.condition}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

interface RotationSectionProps {
  rotation: {
    opener: RotationItem[]
    priority: RotationItem[]
    cooldowns: RotationItem[]
  }
}

export function RotationSection({ rotation }: RotationSectionProps) {
  const t = useTranslations('guide')

  return (
    <section id="rotation">
      <SectionTitle>{t('rotation')}</SectionTitle>
      <div className="space-y-6">
        <RotationGroup title={t('opener')} items={rotation.opener} accent />
        <RotationGroup title={t('priority_list')} items={rotation.priority} />
        <RotationGroup title={t('cooldowns')} items={rotation.cooldowns} />
      </div>
    </section>
  )
}
