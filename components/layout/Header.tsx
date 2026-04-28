import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Swords } from 'lucide-react'
import { LocaleSwitcher } from './LocaleSwitcher'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 text-gold hover:text-gold-light transition-colors duration-200"
        >
          <Swords size={20} strokeWidth={1.5} />
          <span
            className="text-base font-semibold tracking-wider"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            WoWSpec
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className="text-sm text-fg-muted hover:text-fg transition-colors duration-200"
          >
            {t('home')}
          </Link>
        </nav>

        <LocaleSwitcher />
      </div>
    </header>
  )
}
