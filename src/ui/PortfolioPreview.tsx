import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const projects = [
  ['CogFit Jobs', 'Making cognitive work easier to understand and act on.'],
  ['Blue', 'A product concept built through close observation and rapid iteration.'],
  ['Delivery Composer', 'Turning complex delivery planning into a clearer working surface.'],
  ['jamesai.space', 'Experiments in AI, interfaces, and tools for thinking.'],
]

export function PortfolioPreview({ open, onClose }: { open: boolean, onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], input')]
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.removeEventListener('keydown', handleKeyDown); previousFocus?.focus() }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="portfolio-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section ref={dialogRef} className="portfolio-preview" role="dialog" aria-modal="true" aria-labelledby="portfolio-title" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 240 }}>
            <div className="portfolio-header">
              <div><p className="panel-kicker">CURRENT WORK · SELECTED PROJECTS</p><h2 id="portfolio-title">What he’s building</h2></div>
              <button ref={closeRef} className="close-button" onClick={onClose}>Close</button>
            </div>
            <div className="project-list">
              {projects.map(([title, description], index) => (
                <article key={title}>
                  <i className="card-tape" aria-hidden="true" />
                  <span className="project-number">0{index + 1}</span>
                  <div className={`project-doodle project-doodle--${index + 1}`} aria-hidden="true"><i /><i /><i /></div>
                  <div><h3>{title}</h3><p>{description}</p></div>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
            <p className="placeholder-note">Project links and full case studies are intentionally reserved for the next pass.</p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
