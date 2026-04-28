'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { WowSpec, WowClass } from '@/types'
import { WOWHEAD_ICON_CDN } from '@/lib/data/classes'

const ROLE_COLORS: Record<string, string> = {
  tank: 'var(--color-tank)',
  healer: 'var(--color-healer)',
  melee_dps: 'var(--color-melee)',
  ranged_dps: 'var(--color-ranged)',
}

interface SpecCardProps {
  spec: WowSpec
  cls: WowClass
  locale: string
  index: number
}

export function SpecCard({ spec, cls, locale, index }: SpecCardProps) {
  const roleColor = ROLE_COLORS[spec.role]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/${locale}/${cls.id}/${spec.id}`} className="block group">
        <motion.div
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          className="relative flex flex-col items-center gap-2.5 p-4 rounded-xl cursor-pointer overflow-hidden"
          style={{
            background: `color-mix(in srgb, ${cls.color} 4%, var(--color-surface))`,
            border: `1px solid color-mix(in srgb, ${cls.color} 15%, var(--color-border))`,
          }}
        >
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, ${cls.color} 18%, transparent), transparent 70%)`,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          />

          {/* Icon with glow ring */}
          <div className="relative">
            <Image
              src={`${WOWHEAD_ICON_CDN}/${spec.icon}.jpg`}
              alt={spec.name}
              width={56}
              height={56}
              className="rounded-lg relative z-10"
              unoptimized
            />
            <motion.div
              className="absolute -inset-1 rounded-xl opacity-0 blur-sm"
              style={{ backgroundColor: cls.color }}
              whileHover={{ opacity: 0.35 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Spec name */}
          <span
            className="text-xs font-semibold text-fg-muted group-hover:text-fg transition-colors duration-200 relative z-10"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}
          >
            {spec.name}
          </span>

          {/* Role dot */}
          <span
            className="w-1.5 h-1.5 rounded-full relative z-10"
            style={{ backgroundColor: roleColor }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
