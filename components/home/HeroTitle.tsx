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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute left-1/2 -top-6 -translate-x-1/2 w-72 h-20 pointer-events-none blur-3xl opacity-10"
        style={{ background: 'radial-gradient(ellipse, var(--color-gold), transparent 70%)' }}
      />

      <h1 className="relative text-6xl sm:text-7xl font-black tracking-tight leading-none">
        <span
          className="absolute inset-0 blur-2xl opacity-30 select-none"
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
            background: 'linear-gradient(160deg, #ffffff 10%, #d6cab0 50%, var(--color-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {title}
        </span>
      </h1>

      <motion.p
        className="mt-3 text-[11px] tracking-[0.28em] uppercase text-fg-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  )
}
