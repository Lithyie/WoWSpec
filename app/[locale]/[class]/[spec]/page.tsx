import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations, getLocale } from 'next-intl/server'
import { ExternalLink, Calendar, Tag } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { CLASSES, getClass, getSpec, WOWHEAD_ICON_CDN } from '@/lib/data/classes'
import { loadGuide } from '@/lib/data/cache'
import { RoleBadge } from '@/components/ui/RoleBadge'
import { GuideSidebar } from '@/components/layout/GuideSidebar'
import { StrengthsWeaknesses } from '@/components/guide/StrengthsWeaknesses'
import { StatPrioritySection } from '@/components/guide/StatPrioritySection'
import { TalentsSection } from '@/components/guide/TalentsSection'
import { RotationSection } from '@/components/guide/RotationSection'
import { GearSection } from '@/components/guide/GearSection'
import { TipsSection } from '@/components/guide/TipsSection'

interface Params {
  locale: string
  class: string
  spec: string
}

export async function generateStaticParams() {
  const paths: Params[] = []
  for (const locale of routing.locales) {
    for (const cls of CLASSES) {
      for (const spec of cls.specs) {
        paths.push({ locale, class: cls.id, spec: spec.id })
      }
    }
  }
  return paths
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale, class: classSlug, spec: specSlug } = await params
  const cls = getClass(classSlug)
  const spec = getSpec(classSlug, specSlug)
  if (!cls || !spec) return {}
  return {
    title: `${spec.name} ${cls.name}`,
    description: `${spec.name} ${cls.name} guide — stat priority, talents, rotation, BIS gear and tips.`,
  }
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { locale, class: classSlug, spec: specSlug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const cls = getClass(classSlug)
  const spec = getSpec(classSlug, specSlug)
  if (!cls || !spec) notFound()

  const t = await getTranslations('guide')
  const guide = await loadGuide(locale, classSlug, specSlug)

  const wowheadBase = locale === 'fr' ? 'https://fr.wowhead.com' : 'https://www.wowhead.com'
  const wowheadUrl = `${wowheadBase}/guide/classes/${classSlug}/${spec.wowheadSlug}-overview`

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-fg-subtle mb-6">
        <Link href={`/${locale}`} className="hover:text-fg-muted transition-colors">
          {locale === 'fr' ? 'Accueil' : 'Home'}
        </Link>
        <span>/</span>
        <span style={{ color: cls.color }}>{cls.name}</span>
        <span>/</span>
        <span className="text-fg-muted">{spec.name}</span>
      </nav>

      {/* Guide header */}
      <div
        className="relative rounded-xl border border-border overflow-hidden mb-8 p-6"
        style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${cls.color} 8%, var(--color-surface)), var(--color-surface))` }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
          style={{ backgroundColor: cls.color }}
        />
        <div className="flex items-start gap-4 pl-2">
          <Image
            src={`${WOWHEAD_ICON_CDN}/${spec.icon}.jpg`}
            alt={spec.name}
            width={56}
            height={56}
            className="rounded-lg flex-shrink-0"
            unoptimized
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <RoleBadge role={spec.role} locale={locale} size="md" />
              {guide && (
                <span className="flex items-center gap-1 text-xs text-fg-subtle">
                  <Tag size={11} />
                  {t('patch')} {guide.patchVersion}
                </span>
              )}
            </div>
            <h1
              className="text-2xl font-bold text-fg"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {spec.name}{' '}
              <span style={{ color: cls.color }}>{cls.name}</span>
            </h1>
            {guide && (
              <p className="text-sm text-fg-muted mt-2 max-w-prose">{guide.summary}</p>
            )}
          </div>

          <a
            href={wowheadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg border border-border hover:border-gold/30 px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            <ExternalLink size={12} />
            Wowhead
          </a>
        </div>
      </div>

      {/* No guide available */}
      {!guide && (
        <div className="text-center py-20 space-y-4">
          <p className="text-lg text-fg-muted">{t('guide_unavailable')}</p>
          <p className="text-sm text-fg-subtle">{t('guide_unavailable_desc')}</p>
          <a
            href={wowheadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 transition-all duration-150 text-sm"
          >
            <ExternalLink size={14} />
            {t('view_on_wowhead')}
          </a>
        </div>
      )}

      {/* Guide content */}
      {guide && (
        <div className="flex gap-8">
          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-44 flex-shrink-0">
            <div className="sticky top-20">
              <GuideSidebar />
              {guide.fetchedAt && (
                <div className="mt-6 flex items-center gap-1.5 text-xs text-fg-subtle px-3">
                  <Calendar size={11} />
                  {t('updated')}{' '}
                  {new Date(guide.fetchedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-10">
            {(guide.strengths.length > 0 || guide.weaknesses.length > 0) && (
              <StrengthsWeaknesses
                strengths={guide.strengths}
                weaknesses={guide.weaknesses}
              />
            )}
            {guide.statPriority.length > 0 && (
              <StatPrioritySection stats={guide.statPriority} />
            )}
            {(guide.talentString || guide.talentNotes) && (
              <TalentsSection
                talentString={guide.talentString}
                talentNotes={guide.talentNotes}
              />
            )}
            {(guide.rotation.opener.length > 0 ||
              guide.rotation.priority.length > 0 ||
              guide.rotation.cooldowns.length > 0) && (
              <RotationSection rotation={guide.rotation} />
            )}
            {guide.gear.bisList.length > 0 && (
              <GearSection
                bisList={guide.gear.bisList}
                tierSetBonus={guide.gear.tierSetBonus}
              />
            )}
            {guide.tips.length > 0 && <TipsSection tips={guide.tips} />}
          </div>
        </div>
      )}
    </div>
  )
}
