import { getTranslations, getLocale } from 'next-intl/server'
import { CLASSES } from '@/lib/data/classes'
import { ClassBrowser } from '@/components/home/SearchBar'
import { HeroTitle } from '@/components/home/HeroTitle'

export default async function HomePage() {
  const t = await getTranslations('home')
  const locale = await getLocale()

  return (
    <div className="max-w-7xl mx-auto px-8 py-14">
      <HeroTitle title={t('title')} subtitle={t('subtitle')} />
      <ClassBrowser classes={CLASSES} locale={locale} />
    </div>
  )
}
