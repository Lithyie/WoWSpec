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
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: rowIndex * 0.045, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Class label — minimal */}
      <div className="flex items-center gap-2.5 mb-3">
        <Image
          src={`${WOWHEAD_ICON_CDN}/${cls.icon}.jpg`}
          alt={cls.name}
          width={20}
          height={20}
          className="rounded opacity-80"
          unoptimized
        />
        <span
          className="text-[11px] font-bold tracking-[0.18em] uppercase"
          style={{ color: cls.color, opacity: 0.8 }}
        >
          {cls.name}
        </span>
        {/* Color-tinted rule */}
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(to right, color-mix(in srgb, ${cls.color} 20%, transparent), transparent)`,
          }}
        />
      </div>

      {/* Spec icons */}
      <div className="flex flex-wrap gap-2">
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
