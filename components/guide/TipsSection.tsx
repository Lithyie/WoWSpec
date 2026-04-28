import { Lightbulb } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SectionTitle } from './SectionTitle'

interface TipsSectionProps {
  tips: string[]
}

export function TipsSection({ tips }: TipsSectionProps) {
  const t = useTranslations('guide')

  return (
    <section id="tips">
      <SectionTitle>{t('tips')}</SectionTitle>
      <ul className="space-y-2.5">
        {tips.map((tip, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-surface border border-border"
          >
            <Lightbulb
              size={15}
              className="text-gold flex-shrink-0 mt-0.5"
            />
            <p className="text-sm text-fg-muted leading-relaxed">{tip}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
