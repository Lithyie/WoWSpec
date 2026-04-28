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
            (roleFilter === 'dps' &&
              (spec.role === 'melee_dps' || spec.role === 'ranged_dps'))
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
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={tNav('search_placeholder')}
            className="w-full bg-surface border border-border rounded-lg pl-8 pr-8 py-2 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:border-gold/40 transition-colors"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-fg"
              >
                <X size={13} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {ROLE_FILTERS.map(({ value, label }) => (
            <motion.button
              key={value}
              onClick={() => setRoleFilter(value)}
              whileTap={{ scale: 0.95 }}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                roleFilter === value
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-surface text-fg-muted border border-border hover:text-fg',
              ].join(' ')}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Classes */}
      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((cls, i) => (
            <ClassRow key={cls.id} cls={cls} locale={locale} rowIndex={i} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-fg-subtle"
        >
          <Search size={28} className="mx-auto mb-3 opacity-20" />
          <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
        </motion.div>
      )}
    </div>
  )
}
