import type { PhysicsValues } from '../museum/exhibits/VictorExhibit'
import type { StationId } from '../museum/stations'

type Props = {
  stationId: StationId
  engelbartNode: number
  setEngelbartNode: (value: number) => void
  kayShape: { x: number, scale: number }
  setKayShape: (value: { x: number, scale: number }) => void
  physics: PhysicsValues
  setPhysics: (value: PhysicsValues) => void
}

function InteractionSketch({ type }: { type: 'network' | 'medium' | 'feedback' }) {
  if (type === 'network') return (
    <svg className="interaction-sketch" viewBox="0 0 280 68" aria-hidden="true">
      <path d="M18 34h54M91 34h50M160 34h47M72 34l19-18v36zM141 34l19-18v36z" />
      <circle cx="18" cy="34" r="6" /><circle className="accent-fill" cx="213" cy="34" r="9" />
      <path className="accent-stroke" d="M220 27c17-15 32-14 45 1" /><path d="m257 21 8 7-10 4" />
      <text x="11" y="62">idea</text><text x="188" y="62">shared thought</text>
    </svg>
  )
  if (type === 'medium') return (
    <svg className="interaction-sketch" viewBox="0 0 280 68" aria-hidden="true">
      <rect x="19" y="12" width="68" height="43" rx="3" /><rect className="accent-fill" x="40" y="24" width="23" height="20" rx="2" />
      <path d="M103 34h57M151 26l9 8-9 8M177 12h82v43h-82z" /><rect className="accent-fill" x="213" y="21" width="34" height="29" rx="2" />
      <text x="104" y="61">move + resize</text>
    </svg>
  )
  return (
    <svg className="interaction-sketch" viewBox="0 0 280 68" aria-hidden="true">
      <path d="M16 54h246M19 52c35-54 70-54 104 0 34-43 69-43 104 0" />
      <circle className="accent-fill" cx="70" cy="15" r="7" /><path d="M76 12c23-8 47-4 66 11M135 16l7 7-9 3" />
      <text x="154" y="18">the idea answers back</text>
    </svg>
  )
}

export function ExhibitInteraction(props: Props) {
  if (props.stationId === 'engelbart') {
    return (
      <section className="interaction-panel" aria-labelledby="interaction-heading">
        <p className="panel-kicker">LIVE ARTIFACT · HYPERTEXT</p>
        <h2 id="interaction-heading">Follow a connection</h2>
        <p>Move the focus through a small network. Each node makes another idea reachable.</p>
        <InteractionSketch type="network" />
        <div className="node-controls" role="group" aria-label="Select a connected idea">
          {['Mouse', 'NLS', 'Hypertext', 'Collaboration'].map((label, index) => (
            <button key={label} className={props.engelbartNode === index ? 'active' : ''} onClick={() => props.setEngelbartNode(index)}>{label}</button>
          ))}
        </div>
      </section>
    )
  }

  if (props.stationId === 'kay') {
    return (
      <section className="interaction-panel" aria-labelledby="interaction-heading">
        <p className="panel-kicker">LIVE ARTIFACT · DYNAMIC MEDIUM</p>
        <h2 id="interaction-heading">Shape the surface</h2>
        <p>The result changes as you change the idea—no compile step, no permission required.</p>
        <InteractionSketch type="medium" />
        <label>Position <input type="range" min="-1" max="1" step="0.05" value={props.kayShape.x} onChange={(event) => props.setKayShape({ ...props.kayShape, x: Number(event.target.value) })} /></label>
        <label>Scale <input type="range" min="0.5" max="1.7" step="0.05" value={props.kayShape.scale} onChange={(event) => props.setKayShape({ ...props.kayShape, scale: Number(event.target.value) })} /></label>
      </section>
    )
  }

  if (props.stationId === 'victor') {
    const update = (key: keyof PhysicsValues, value: number) => props.setPhysics({ ...props.physics, [key]: value })
    return (
      <section className="interaction-panel" aria-labelledby="interaction-heading">
        <p className="panel-kicker">LIVE ARTIFACT · IMMEDIATE FEEDBACK</p>
        <h2 id="interaction-heading">Touch the behavior</h2>
        <p>Change the system and watch its meaning move immediately.</p>
        <InteractionSketch type="feedback" />
        <label htmlFor="gravity-control">Gravity <output htmlFor="gravity-control">{props.physics.gravity.toFixed(1)}</output><input id="gravity-control" type="range" min="1" max="10" step="0.5" value={props.physics.gravity} onChange={(event) => update('gravity', Number(event.target.value))} /></label>
        <label htmlFor="velocity-control">Velocity <output htmlFor="velocity-control">{props.physics.velocity.toFixed(1)}</output><input id="velocity-control" type="range" min="1" max="10" step="0.5" value={props.physics.velocity} onChange={(event) => update('velocity', Number(event.target.value))} /></label>
        <label htmlFor="bounce-control">Bounce <output htmlFor="bounce-control">{props.physics.bounce.toFixed(1)}</output><input id="bounce-control" type="range" min="1" max="8" step="0.5" value={props.physics.bounce} onChange={(event) => update('bounce', Number(event.target.value))} /></label>
      </section>
    )
  }

  return null
}
