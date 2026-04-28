'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

const SECTIONS = [
  { id: 'overview', key: 'overview' },
  { id: 'stat-priority', key: 'stat_priority' },
  { id: 'talents', key: 'talents' },
  { id: 'rotation', key: 'rotation' },
  { id: 'gear', key: 'gear' },
  { id: 'tips', key: 'tips' },
] as const

export function GuideSidebar() {
  const t = useTranslations('guide')
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="space-y-0.5" aria-label="Guide sections">
      {SECTIONS.map(({ id, key }) => (
        <a
          key={id}
          href={`#${id}`}
          className={[
            'flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-all duration-150',
            active === id
              ? 'text-gold bg-gold/8 border-l-2 border-gold pl-2.5'
              : 'text-fg-muted hover:text-fg hover:bg-elevated border-l-2 border-transparent pl-2.5',
          ].join(' ')}
        >
          {t(key)}
        </a>
      ))}
    </nav>
  )
}
