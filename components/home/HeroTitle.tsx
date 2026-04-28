'use client'

import { motion } from 'framer-motion'

interface HeroTitleProps {
  title: string
  subtitle: string
}

export function HeroTitle({ title, subtitle }: HeroTitleProps) {
  return (
    <motion.div
      className="mb-12 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.h1
        className="text-5xl font-bold mb-4 tracking-wide"
        style={{ fontFamily: 'var(--font-display)' }}
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        animate={{ opacity: 1, letterSpacing: '0.05em' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span
          className="inline-block"
          style={{
            background: 'linear-gradient(135deg, var(--color-fg) 30%, var(--color-gold-light) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {title}
        </span>
      </motion.h1>

      <motion.p
        className="text-fg-muted text-base max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {subtitle}
      </motion.p>

      {/* Decorative separator */}
      <motion.div
        className="flex items-center justify-center gap-3 mt-6"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <div className="h-px w-16" style={{ background: 'linear-gradient(to left, var(--color-gold), transparent)' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-60" />
        <div className="h-px w-16" style={{ background: 'linear-gradient(to right, var(--color-gold), transparent)' }} />
      </motion.div>
    </motion.div>
  )
}
