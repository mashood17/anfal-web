const BADGE_CONFIG = {
  best_seller:   { label: 'Best Seller',   classes: 'bg-brand-accent/15 text-brand-accent border-brand-accent/30' },
  chef_special:  { label: 'Chef Special',  classes: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  popular:       { label: 'Popular',       classes: 'bg-rose-500/15 text-rose-400 border-rose-500/30' },
  new:           { label: 'New',           classes: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
}

export default function Badge({ type }) {
  const config = BADGE_CONFIG[type]
  if (!config) return null

  return (
    <span className={`
      inline-flex items-center px-2 py-0.5 rounded-full 
      text-[10px] font-medium tracking-wide uppercase border
      ${config.classes}
    `}>
      {config.label}
    </span>
  )
}