interface SectionTitleProps {
  children: React.ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2
        className="text-sm font-semibold uppercase tracking-widest text-gold"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {children}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
