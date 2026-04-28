import { CheckCircle, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SectionTitle } from './SectionTitle'

interface StrengthsWeaknessesProps {
  strengths: string[]
  weaknesses: string[]
}

export function StrengthsWeaknesses({ strengths, weaknesses }: StrengthsWeaknessesProps) {
  const t = useTranslations('guide')

  return (
    <section id="overview">
      <SectionTitle>{t('overview')}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={15} className="text-healer flex-shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-wider text-healer">
              {t('strengths')}
            </span>
          </div>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-fg-muted">
                <span className="text-healer mt-0.5 flex-shrink-0">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={15} className="text-melee flex-shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-wider text-melee">
              {t('weaknesses')}
            </span>
          </div>
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-fg-muted">
                <span className="text-melee mt-0.5 flex-shrink-0">−</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
