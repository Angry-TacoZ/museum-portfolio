import { useCallback, useEffect, useMemo, useState } from 'react'
import { MuseumScene } from './museum/MuseumScene'
import { previousStation, stationById, stations, type StationId } from './museum/stations'
import type { PhysicsValues } from './museum/exhibits/VictorExhibit'
import { ExhibitOverlay } from './ui/ExhibitOverlay'
import { ExhibitInteraction } from './ui/ExhibitInteraction'
import { PortfolioPreview } from './ui/PortfolioPreview'
import { ErrorBoundary } from './ErrorBoundary'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
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
  const [engelbartNode, setEngelbartNode] = useState(0)
  const [kayShape, setKayShape] = useState({ x: 0, scale: 1 })
  const [physics, setPhysics] = useState<PhysicsValues>({ gravity: 5, velocity: 5, bounce: 4 })
  const reducedMotion = useReducedMotion()
  const station = stationById[stationId]
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
    <main className="museum-app">
      <a className="skip-link" href="#exhibit-content">Skip to exhibit content</a>
      <header className="museum-header">
        <a className="wordmark" href="#" onClick={(event) => { event.preventDefault(); navigateToStation('entrance') }}>JAMES LANE <span>/ EXHIBIT 01</span></a>
        <div className="route-progress" aria-label={`Station ${station.index + 1} of ${stations.length}`}>
          <span>{String(station.index + 1).padStart(2, '0')}</span>
          <i><b style={{ width: `${((station.index + 1) / stations.length) * 100}%` }} /></i>
          <span>05</span>
        </div>
      </header>

      <ErrorBoundary fallback={fallback} onError={handleWebglError}>
        <MuseumScene station={station} moving={moving} reducedMotion={reducedMotion} engelbartNode={engelbartNode} kayShape={kayShape} physics={physics} onContinue={continueTour} onArrival={() => setMoving(false)} forceFailure={forceWebglFailure} />
      </ErrorBoundary>

      <div id="exhibit-content">
        <ExhibitOverlay station={station} moving={moving} reducedMotion={reducedMotion} onContinue={continueTour} onPortfolio={() => setPortfolioOpen(true)} />
        {station.interactionEnabled && station.id !== 'james' && !moving && (
          <ExhibitInteraction stationId={station.id} engelbartNode={engelbartNode} setEngelbartNode={setEngelbartNode} kayShape={kayShape} setKayShape={setKayShape} physics={physics} setPhysics={setPhysics} />
        )}
      </div>

      <footer className="museum-footer"><span>GUIDED TOUR</span><span>{moving ? 'MOVING TO NEXT EXHIBIT' : station.id === 'james' ? 'TOUR COMPLETE · THE WORK CONTINUES' : 'CLICK A SIGN TO PROCEED'}</span></footer>
      <PortfolioPreview open={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
    </main>
  )
}

export default App
