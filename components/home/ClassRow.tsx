'use client'

import { motion } from 'framer-motion'
import type { WowClass } from '@/types'
import { SpecCard } from './SpecCard'

interface ClassRowProps {
  cls: WowClass
  locale: string
  rowIndex: number
}

export function ClassRow({ cls, locale, rowIndex }: ClassRowProps) {
  return (
    <motion.div
      className="flex justify-center flex-wrap gap-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: rowIndex * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      {cls.specs.map((spec, i) => (
        <SpecCard
          key={spec.id}
          spec={spec}
          cls={cls}
          locale={locale}
          index={rowIndex * 4 + i}
        />
      ))}
    </motion.div>
  )
}
