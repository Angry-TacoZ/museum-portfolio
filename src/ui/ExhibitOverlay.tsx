import { AnimatePresence, motion } from 'framer-motion'
import type { Station } from '../museum/stations'

const sources: Record<string, { url: string, label: string }> = {
  engelbart: { url: 'https://www.dougengelbart.org/mousesite/1968Demo.html', label: 'Explore the 1968 demonstration' },
  kay: { url: 'https://worrydream.com/refs/Kay_1977_-_Personal_Dynamic_Media.pdf', label: 'Read Personal Dynamic Media (PDF)' },
  victor: { url: 'https://worrydream.com/ExplorableExplanations/', label: 'Read Explorable Explanations' },
}

export function ExhibitOverlay({ station, moving, reducedMotion, onContinue, onPortfolio }: { station: Station, moving: boolean, reducedMotion: boolean, onContinue: () => void, onPortfolio: () => void }) {
  const text = station.id === 'james'
    ? 'I’m James, a career-changing product builder working across interaction design and frontend engineering. I turn complicated decisions into interfaces people can inspect, change, and understand. This installation is still in progress. The projects are ready to explore.'
    : station.subtitle

  return (
    <AnimatePresence mode="wait">
      <motion.section key={station.id} className={`exhibit-copy exhibit-copy--${station.id}`} initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: moving ? 0.42 : 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: reducedMotion ? 0 : 0.5 }} aria-live="polite">
        <p className="eyebrow">{station.id === 'entrance' ? <><strong>Built for Notion</strong><span> / An interactive project</span></> : station.eyebrow}</p>
        <h1>{station.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
        {station.id === 'james' && <p className="installation-label">INSTALLATION IN PROGRESS</p>}
        <p className="station-summary">{text}</p>
        {sources[station.id] && <a className="source-link" href={sources[station.id].url} target="_blank" rel="noreferrer">{sources[station.id].label} ↗<span className="sr-only"> (new tab)</span></a>}
        {station.id === 'james' && <button className="portfolio-cta" onClick={onPortfolio}>EXPLORE MY WORK →</button>}
        {station.nextLabel && <button className="mobile-next" disabled={moving} onClick={onContinue}>{moving ? 'MOVING…' : station.nextLabel}</button>}
      </motion.section>
    </AnimatePresence>
  )
}
