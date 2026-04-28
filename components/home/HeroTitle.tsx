'use client'

import { motion } from 'framer-motion'

interface HeroTitleProps {
  title: string
  subtitle: string
}

export function HeroTitle({ title, subtitle }: HeroTitleProps) {
  return (
    <motion.div
      className="mb-16 text-center relative"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 -top-8 -translate-x-1/2 w-80 h-24 pointer-events-none blur-3xl opacity-12"
        style={{ background: 'radial-gradient(ellipse, var(--color-gold), transparent 70%)' }}
      />

      <h1
        className="relative text-6xl sm:text-7xl font-extrabold tracking-tight leading-none"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <span
          className="absolute inset-0 blur-xl opacity-35 select-none"
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
        <span
          style={{
            background: 'linear-gradient(160deg, #ffffff 15%, #d4c5a0 55%, var(--color-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {title}
        </span>
      </h1>

      <motion.p
        className="mt-3 text-xs tracking-[0.22em] uppercase text-fg-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  )
}
