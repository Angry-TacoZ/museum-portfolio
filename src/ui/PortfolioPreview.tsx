import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { projects } from './projects'

export function PortfolioPreview({ open, onClose, reducedMotion }: { open: boolean, onClose: () => void, reducedMotion: boolean }) {
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
        <motion.div className="portfolio-backdrop" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: reducedMotion ? 1 : 0 }}>
          <motion.section ref={dialogRef} className="portfolio-preview" role="dialog" aria-modal="true" aria-labelledby="portfolio-title" initial={{ y: reducedMotion ? 0 : '100%' }} animate={{ y: 0 }} exit={{ y: reducedMotion ? 0 : '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 240 }}>
            <div className="portfolio-header">
              <div><p className="panel-kicker">JAMES LANE / SELECTED WORK</p><h2 id="portfolio-title">From idea to interface.</h2></div>
              <button ref={closeRef} className="close-button" onClick={onClose}>Close</button>
            </div>
            <p className="portfolio-intro">Interfaces for understanding a decision, changing it, and seeing what happens next. Three projects, with the implementation open for inspection.</p>
            <div className="selected-projects">
              {projects.map((project, index) => (
                <article key={project.title}>
                  <span className="project-number" aria-hidden="true">0{index + 1}</span>
                  <div className="project-title"><p className="panel-kicker">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p><small>{project.stack}</small></div>
                  <div className="project-decision"><h4>A design decision</h4><p>{project.decision}</p><p className="project-boundary">{project.boundary}</p><div className="project-links"><a href={project.url} target="_blank" rel="noreferrer">Read the build ↗<span className="sr-only">: {project.title} (new tab)</span></a>{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Open project ↗<span className="sr-only">: {project.title} (new tab)</span></a>}</div></div>
                </article>
              ))}
            </div>
            <div className="portfolio-outro"><p>The exhibition ends here.<br /><strong>The work keeps evolving.</strong></p><a href="https://james-lane-web-resume.web.app/" target="_blank" rel="noreferrer">Résumé & contact ↗<span className="sr-only"> (new tab)</span></a></div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
