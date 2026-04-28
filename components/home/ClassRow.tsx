'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { WowClass } from '@/types'
import { WOWHEAD_ICON_CDN } from '@/lib/data/classes'
import { SpecCard } from './SpecCard'

interface ClassRowProps {
  cls: WowClass
  locale: string
  rowIndex: number
}

export function ClassRow({ cls, locale, rowIndex }: ClassRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: rowIndex * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Class header */}
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={`${WOWHEAD_ICON_CDN}/${cls.icon}.jpg`}
          alt={cls.name}
          width={28}
          height={28}
          className="rounded-md opacity-90"
          unoptimized
        />
        <span
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: cls.color, fontFamily: 'var(--font-display)' }}
        >
          {cls.name}
        </span>
        {/* Gradient rule */}
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(to right, color-mix(in srgb, ${cls.color} 30%, transparent), transparent)`,
          }}
        />
      </div>

      {/* Spec grid */}
      <div className="flex flex-wrap gap-2.5 pl-1">
        {cls.specs.map((spec, i) => (
          <SpecCard
            key={spec.id}
            spec={spec}
            cls={cls}
            locale={locale}
            index={rowIndex * 4 + i}
          />
        ))}
      </div>
    </motion.div>
  )
}
