import { useCallback, useEffect, useMemo, useState } from 'react'
import { MuseumScene } from './museum/MuseumScene'
import { stationById, stations, type StationId } from './museum/stations'
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
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [engelbartNode, setEngelbartNode] = useState(0)
  const [kayShape, setKayShape] = useState({ x: 0, scale: 1 })
  const [physics, setPhysics] = useState<PhysicsValues>({ gravity: 5, velocity: 5, bounce: 4 })
  const reducedMotion = useReducedMotion()
  const station = stationById[stationId]

  const continueTour = useCallback(() => {
    if (moving || !station.nextStation) return
    setMoving(true)
    setStationId(station.nextStation)
  }, [moving, station.nextStation])

  const fallback = useMemo(() => (
    <div className="webgl-fallback" role="status">
      <p>3D view unavailable</p>
      <span>The complete exhibit remains accessible through the guided text controls.</span>
    </div>
  ), [])

  return (
    <main className="museum-app">
      <a className="skip-link" href="#exhibit-content">Skip to exhibit content</a>
      <header className="museum-header">
        <a className="wordmark" href="#" onClick={(event) => { event.preventDefault(); if (!moving) setStationId('entrance') }}>JAMES LANE <span>/ EXHIBIT 01</span></a>
        <div className="route-progress" aria-label={`Station ${station.index + 1} of ${stations.length}`}>
          <span>{String(station.index + 1).padStart(2, '0')}</span>
          <i><b style={{ width: `${((station.index + 1) / stations.length) * 100}%` }} /></i>
          <span>05</span>
        </div>
      </header>

      <ErrorBoundary fallback={fallback}>
        <MuseumScene station={station} moving={moving} reducedMotion={reducedMotion} engelbartNode={engelbartNode} kayShape={kayShape} physics={physics} onContinue={continueTour} onArrival={() => setMoving(false)} />
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
