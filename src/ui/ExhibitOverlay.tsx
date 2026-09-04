import { AnimatePresence, motion } from 'framer-motion'
import type { Station } from '../museum/stations'

export function ExhibitOverlay({ station, moving, reducedMotion, onContinue, onPortfolio }: { station: Station, moving: boolean, reducedMotion: boolean, onContinue: () => void, onPortfolio: () => void }) {
  const text = station.id === 'james'
    ? 'I discovered these ideas after I had already started building this way. I use AI and software to explore problems, make ideas tangible, and learn by building.'
    : station.subtitle

  return (
    <AnimatePresence mode="wait">
      <motion.section key={station.id} className={`exhibit-copy exhibit-copy--${station.id}`} initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: moving ? 0.42 : 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: reducedMotion ? 0 : 0.5 }} aria-live="polite">
        <p className="eyebrow">{station.eyebrow}</p>
        <h1>{station.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
        {station.id === 'james' && <p className="installation-label">INSTALLATION IN PROGRESS</p>}
        <p className="station-summary">{text}</p>
        {station.id === 'james' && <button className="portfolio-cta" onClick={onPortfolio}>SEE WHAT HE’S BUILDING →</button>}
        {station.nextLabel && <button className="mobile-next" disabled={moving} onClick={onContinue}>{moving ? 'MOVING…' : station.nextLabel}</button>}
      </motion.section>
    </AnimatePresence>
  )
}
