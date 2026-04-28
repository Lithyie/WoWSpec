'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

const LOCALES = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
]

export function LocaleSwitcher() {
  const currentLocale = useLocale()
  const pathname = usePathname()

  function getLocalePath(targetLocale: string) {
    const segments = pathname.split('/')
    segments[1] = targetLocale
    return segments.join('/')
  }

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map(({ code, flag, label }) => (
        <Link
          key={code}
          href={getLocalePath(code)}
          aria-label={label}
          title={label}
          className={[
            'flex items-center justify-center w-8 h-8 rounded text-lg transition-all duration-200',
            currentLocale === code
              ? 'bg-elevated ring-1 ring-border opacity-100'
              : 'opacity-40 hover:opacity-80 hover:bg-elevated',
          ].join(' ')}
        >
          {flag}
        </Link>
      ))}
    </div>
  )
}
