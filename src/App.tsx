import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { previousStation, stationById, stations, type StationId } from './museum/stations'
import type { PhysicsValues } from './museum/exhibits/VictorExhibit'
import { ExhibitOverlay } from './ui/ExhibitOverlay'
import { ExhibitInteraction } from './ui/ExhibitInteraction'
import { PortfolioPreview } from './ui/PortfolioPreview'
import { ErrorBoundary } from './ErrorBoundary'

const MuseumScene = lazy(() => import('./museum/MuseumScene').then((module) => ({ default: module.MuseumScene })))

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function App() {
  const [stationId, setStationId] = useState<StationId>('entrance')
  const [moving, setMoving] = useState(false)
  const [webglFailed, setWebglFailed] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [motionPaused, setMotionPaused] = useState(false)
  const [engelbartNode, setEngelbartNode] = useState(0)
  const [kayShape, setKayShape] = useState({ x: 0, scale: 1 })
  const [physics, setPhysics] = useState<PhysicsValues>({ gravity: 5, velocity: 5, bounce: 4 })
  const reducedMotion = useReducedMotion()
  const effectiveReducedMotion = reducedMotion || motionPaused
  const station = stationById[stationId]
  useEffect(() => {
    document.querySelector('.museum-shell')?.scrollTo({ top: 0 })
  }, [stationId])
  const localHost = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
  const forceWebglFailure = localHost && new URLSearchParams(window.location.search).get('forceWebglFailure') === '1'

  const navigateToStation = useCallback((target: StationId) => {
    if (target === stationId || (moving && !webglFailed)) return
    setPortfolioOpen(false)
    setMoving(!webglFailed)
    setStationId(target)
  }, [moving, stationId, webglFailed])

  const navigateFallback = useCallback((target: StationId) => {
    setPortfolioOpen(false)
    setMoving(false)
    setStationId(target)
  }, [])

  const continueTour = useCallback(() => {
    if (!station.nextStation) return
    navigateToStation(station.nextStation)
  }, [navigateToStation, station.nextStation])

  const handleWebglError = useCallback(() => {
    setWebglFailed(true)
    setMoving(false)
  }, [])

  const fallback = useMemo(() => {
    const previous = previousStation(station.id)
    const next = station.nextStation
    return (
    <div className="webgl-fallback">
      <div className="webgl-fallback__content">
        <div role="status">
          <p>3D view unavailable</p>
          <span>The complete exhibit remains accessible through the guided text controls.</span>
        </div>
        <nav className="webgl-fallback__controls" aria-label="Fallback exhibit navigation">
          {previous && <button onClick={() => navigateFallback(previous)}>← PREVIOUS EXHIBIT</button>}
          {next && <button onClick={() => navigateFallback(next)}>{station.nextLabel}</button>}
        </nav>
      </div>
    </div>
    )
  }, [navigateFallback, station])

  return (
    <main className={`museum-app museum-app--${stationId}${webglFailed ? ' museum-app--fallback' : ''}${effectiveReducedMotion ? ' museum-app--reduced-motion' : ''}`}>
      <div className="museum-shell" inert={portfolioOpen}>
      <a className="skip-link" href="#exhibit-content">Skip to exhibit content</a>
      <header className="museum-header">
        <a className="wordmark" href="#" onClick={(event) => { event.preventDefault(); navigateToStation('entrance') }}>JAMES LANE <span>/ EXHIBIT 01</span></a>
        <button className="motion-toggle" aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? 'Resume motion' : 'Pause motion'}</button>
        <button className="header-work" onClick={() => setPortfolioOpen(true)}>Selected work ↗</button>
        <div className="route-progress" aria-label={`Station ${station.index + 1} of ${stations.length}`}>
          <span>{String(station.index + 1).padStart(2, '0')}</span>
          <i><b style={{ width: `${((station.index + 1) / stations.length) * 100}%` }} /></i>
          <span>05</span>
        </div>
      </header>

      <ErrorBoundary fallback={fallback} onError={handleWebglError}>
        <Suspense fallback={<p className="scene-loading" role="status">Preparing the exhibition… You can explore selected work while it loads.</p>}>
        <MuseumScene station={station} moving={moving} reducedMotion={effectiveReducedMotion} engelbartNode={engelbartNode} kayShape={kayShape} physics={physics} onContinue={continueTour} onArrival={() => setMoving(false)} forceFailure={forceWebglFailure} />
        </Suspense>
      </ErrorBoundary>

      <div id="exhibit-content" tabIndex={-1}>
        <ExhibitOverlay station={station} moving={moving} reducedMotion={effectiveReducedMotion} onContinue={continueTour} onPortfolio={() => setPortfolioOpen(true)} />
        {station.interactionEnabled && station.id !== 'james' && !moving && (
          <ExhibitInteraction stationId={station.id} engelbartNode={engelbartNode} setEngelbartNode={setEngelbartNode} kayShape={kayShape} setKayShape={setKayShape} physics={physics} setPhysics={setPhysics} />
        )}
      </div>

      <footer className="museum-footer"><span>DESIGNED & BUILT BY JAMES LANE</span><nav aria-label="Exhibition navigation">
        <button disabled={moving || !previousStation(stationId)} onClick={() => { const previous = previousStation(stationId); if (previous) navigateToStation(previous) }}>← Previous</button>
        <span aria-live="polite">{moving ? 'Moving…' : `${station.index + 1} / ${stations.length}`}</span>
        {station.nextStation ? <button disabled={moving} onClick={continueTour}>Next →</button> : <button onClick={() => setPortfolioOpen(true)}>View work ↗</button>}
      </nav></footer>
      </div>
      <PortfolioPreview open={portfolioOpen} onClose={() => setPortfolioOpen(false)} reducedMotion={effectiveReducedMotion} />
    </main>
  )
}

export default App
