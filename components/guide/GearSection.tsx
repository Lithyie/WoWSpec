import { useTranslations } from 'next-intl'
import type { GearItem } from '@/types'
import { SectionTitle } from './SectionTitle'

interface GearSectionProps {
  bisList: GearItem[]
  tierSetBonus?: string
}

export function GearSection({ bisList, tierSetBonus }: GearSectionProps) {
  const t = useTranslations('guide')

  return (
    <section id="gear">
      <SectionTitle>{t('gear')}</SectionTitle>
      <div className="space-y-4">
        {tierSetBonus && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gold/5 border border-gold/15">
            <span className="text-gold text-xs font-semibold uppercase tracking-wider flex-shrink-0 pt-0.5">
              {t('tier_set')}
            </span>
            <p className="text-sm text-fg-muted">{tierSetBonus}</p>
          </div>
        )}

        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-elevated text-left">
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  {t('slot')}
                </th>
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  {t('item')}
                </th>
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-fg-muted hidden sm:table-cell">
                  {t('source_location')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bisList.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-elevated transition-colors duration-100"
                >
                  <td className="px-4 py-2.5 text-fg-muted text-xs">{item.slot}</td>
                  <td className="px-4 py-2.5 text-fg font-medium">{item.item}</td>
                  <td className="px-4 py-2.5 text-fg-subtle text-xs hidden sm:table-cell">
                    {item.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
