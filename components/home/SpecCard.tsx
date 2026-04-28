'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { WowSpec, WowClass } from '@/types'
import { WOWHEAD_ICON_CDN } from '@/lib/data/classes'

interface SpecCardProps {
  spec: WowSpec
  cls: WowClass
  locale: string
  index: number
}

export function SpecCard({ spec, cls, locale, index }: SpecCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/${locale}/${cls.id}/${spec.id}`} className="block">
        <motion.div
          className="relative overflow-hidden rounded-xl cursor-pointer"
          style={{ width: 76, height: 76 }}
          whileHover="hover"
          initial="rest"
        >
          {/* Deep glow behind icon */}
          <motion.div
            className="absolute -inset-2 rounded-2xl blur-lg"
            style={{ backgroundColor: cls.color }}
            variants={{ rest: { opacity: 0 }, hover: { opacity: 0.45 } }}
            transition={{ duration: 0.25 }}
          />

          {/* Tile background */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `color-mix(in srgb, ${cls.color} 6%, var(--color-surface))`,
            }}
            variants={{
              rest: { background: `color-mix(in srgb, ${cls.color} 6%, var(--color-surface))` },
              hover: { background: `color-mix(in srgb, ${cls.color} 14%, var(--color-surface))` },
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Border ring */}
          <motion.div
            className="absolute inset-0 rounded-xl border"
            style={{ borderColor: cls.color }}
            variants={{ rest: { opacity: 0.12 }, hover: { opacity: 0.6 } }}
            transition={{ duration: 0.2 }}
          />

          {/* Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.1, y: -2 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <Image
              src={`${WOWHEAD_ICON_CDN}/${spec.icon}.jpg`}
              alt={spec.name}
              width={54}
              height={54}
              className="rounded-lg relative z-10"
              unoptimized
            />
          </motion.div>

          {/* Spec name — slides up from bottom on hover */}
          <motion.div
            className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-1.5 z-20"
            variants={{ rest: { opacity: 0, y: 6 }, hover: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.18 }}
          >
            <span
              className="text-[9px] font-semibold uppercase tracking-widest px-1 leading-none"
              style={{
                color: cls.color,
                textShadow: `0 0 10px ${cls.color}`,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {spec.name}
            </span>
          </motion.div>

          {/* Top shine sweep on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)',
            }}
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
