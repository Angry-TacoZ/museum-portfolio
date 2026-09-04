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

export function ExhibitInteraction(props: Props) {
  if (props.stationId === 'engelbart') {
    return (
      <section className="interaction-panel" aria-labelledby="interaction-heading">
        <p className="panel-kicker">LIVE ARTIFACT · HYPERTEXT</p>
        <h2 id="interaction-heading">Follow a connection</h2>
        <p>Move the focus through a small network. Each node makes another idea reachable.</p>
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
        <label htmlFor="gravity-control">Gravity <output htmlFor="gravity-control">{props.physics.gravity.toFixed(1)}</output><input id="gravity-control" type="range" min="1" max="10" step="0.5" value={props.physics.gravity} onChange={(event) => update('gravity', Number(event.target.value))} /></label>
        <label htmlFor="velocity-control">Velocity <output htmlFor="velocity-control">{props.physics.velocity.toFixed(1)}</output><input id="velocity-control" type="range" min="1" max="10" step="0.5" value={props.physics.velocity} onChange={(event) => update('velocity', Number(event.target.value))} /></label>
        <label htmlFor="bounce-control">Bounce <output htmlFor="bounce-control">{props.physics.bounce.toFixed(1)}</output><input id="bounce-control" type="range" min="1" max="8" step="0.5" value={props.physics.bounce} onChange={(event) => update('bounce', Number(event.target.value))} /></label>
      </section>
    )
  }

  return null
}
