'use client'

import { motion } from 'framer-motion'

interface HeroTitleProps {
  title: string
  subtitle: string
}

export function HeroTitle({ title, subtitle }: HeroTitleProps) {
  return (
    <motion.div
      className="mb-14 text-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glow orb behind title */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 pointer-events-none blur-3xl opacity-15"
        style={{ background: 'radial-gradient(ellipse, var(--color-gold), transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="relative text-5xl sm:text-6xl font-bold tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {/* Shadow layer for depth */}
          <span
            className="absolute inset-0 blur-2xl opacity-40 select-none"
            aria-hidden
            style={{
              background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </span>
          {/* Actual text */}
          <span
            className="relative"
            style={{
              background: 'linear-gradient(160deg, #fff 20%, var(--color-gold-light) 55%, var(--color-gold) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </span>
        </h1>
      </motion.div>

      <motion.p
        className="mt-4 text-sm text-fg-subtle max-w-sm mx-auto tracking-wide"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>

      {/* Ornamental divider */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-7"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="h-px w-20"
          style={{ background: 'linear-gradient(to left, var(--color-gold), transparent)' }}
        />
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 0L7.5 4.5H12L8.25 7.5L9.75 12L6 9L2.25 12L3.75 7.5L0 4.5H4.5L6 0Z" fill="var(--color-gold)" opacity="0.7" />
        </svg>
        <div
          className="h-px w-20"
          style={{ background: 'linear-gradient(to right, var(--color-gold), transparent)' }}
        />
      </motion.div>
    </motion.div>
  )
}
