import { useTranslations } from 'next-intl'
import { SectionTitle } from './SectionTitle'

interface StatPrioritySectionProps {
  stats: string[]
}

export function StatPrioritySection({ stats }: StatPrioritySectionProps) {
  const t = useTranslations('guide')
  const maxBar = 100
  const step = maxBar / (stats.length + 1)

  return (
    <section id="stat-priority">
      <SectionTitle>{t('stat_priority')}</SectionTitle>
      <div className="space-y-3">
        {stats.map((stat, i) => {
          const width = maxBar - step * i
          return (
            <div key={stat} className="flex items-center gap-4">
              <span className="w-5 text-right text-xs font-mono text-gold flex-shrink-0">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-fg">{stat}</span>
                </div>
                <div className="h-2 bg-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${width}%`,
                      background: `linear-gradient(to right, var(--color-gold), var(--color-gold-light))`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
