'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SectionTitle } from './SectionTitle'

interface TalentsSectionProps {
  talentString?: string
  talentNotes?: string
}

export function TalentsSection({ talentString, talentNotes }: TalentsSectionProps) {
  const t = useTranslations('guide')
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!talentString) return
    await navigator.clipboard.writeText(talentString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="talents">
      <SectionTitle>{t('talents')}</SectionTitle>
      <div className="space-y-4">
        {talentString && (
          <div className="flex items-center gap-3 bg-elevated rounded-lg border border-border p-3">
            <code className="flex-1 text-xs font-mono text-fg-muted truncate">
              {talentString}
            </code>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 transition-all duration-150"
              title={t('copy_talents')}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? t('copied') : t('copy_talents')}</span>
            </button>
          </div>
        )}
        {talentNotes && (
          <p className="text-sm text-fg-muted leading-relaxed">{talentNotes}</p>
        )}
      </div>
    </section>
  )
}
