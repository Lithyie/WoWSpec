'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { WowClass } from '@/types'
import { ClassRow } from './ClassRow'

interface ClassBrowserProps {
  classes: WowClass[]
  locale: string
}

type RoleFilter = 'all' | 'tank' | 'healer' | 'dps'

export function ClassBrowser({ classes, locale }: ClassBrowserProps) {
  const t = useTranslations('home')
  const tNav = useTranslations('nav')
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return classes
      .map(cls => ({
        ...cls,
        specs: cls.specs.filter(spec => {
          const matchesQuery =
            !q || cls.name.toLowerCase().includes(q) || spec.name.toLowerCase().includes(q)
          const matchesRole =
            roleFilter === 'all' ||
            (roleFilter === 'tank' && spec.role === 'tank') ||
            (roleFilter === 'healer' && spec.role === 'healer') ||
            (roleFilter === 'dps' && (spec.role === 'melee_dps' || spec.role === 'ranged_dps'))
          return matchesQuery && matchesRole
        }),
      }))
      .filter(cls => cls.specs.length > 0)
  }, [classes, query, roleFilter])

  const ROLE_FILTERS: { value: RoleFilter; label: string }[] = [
    { value: 'all', label: t('all_roles') },
    { value: 'tank', label: t('filter_tanks') },
    { value: 'healer', label: t('filter_healers') },
    { value: 'dps', label: t('filter_dps') },
  ]

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Controls — centered */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={tNav('search_placeholder')}
            className="w-56 bg-surface/60 border border-border rounded-lg pl-8 pr-8 py-2 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:border-gold/40 transition-colors backdrop-blur-sm"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-fg"
              >
                <X size={12} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-1.5">
          {ROLE_FILTERS.map(({ value, label }) => (
            <motion.button
              key={value}
              onClick={() => setRoleFilter(value)}
              whileTap={{ scale: 0.94 }}
              className={[
                'px-3 py-1 rounded text-xs font-medium tracking-wide transition-all duration-200',
                roleFilter === value
                  ? 'bg-gold/12 text-gold border border-gold/25'
                  : 'text-fg-subtle border border-transparent hover:text-fg-muted',
              ].join(' ')}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Icon grid — groups by class, all centered */}
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
        <AnimatePresence mode="popLayout">
          {filtered.map((cls, i) => (
            <ClassRow key={cls.id} cls={cls} locale={locale} rowIndex={i} />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-fg-subtle py-10"
          >
            No results
          </motion.p>
        )}
      </div>
    </div>
  )
}
