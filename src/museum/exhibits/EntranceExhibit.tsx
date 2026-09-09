import { Edges, Html } from '@react-three/drei'

export function EntranceExhibit({ active, moving, onContinue }: { active: boolean, moving: boolean, onContinue: () => void }) {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 2.15, 0.18]} castShadow>
        <boxGeometry args={[7.6, 3.4, 0.18]} />
        <meshStandardMaterial color="#e4e1d7" roughness={0.96} />
        <Edges color="#262722" threshold={12} />
      </mesh>
      <mesh position={[0, 4.12, 0.27]}>
        <boxGeometry args={[1.1, 0.055, 0.05]} />
        <meshStandardMaterial color="#a9d5e7" emissive="#87bfd7" emissiveIntensity={0.18} />
        <Edges color="#262722" threshold={10} />
      </mesh>
      {active && <Html position={[0, 2.15, 0.3]} center transform distanceFactor={4} zIndexRange={[3, 0]}>
        <section id="entrance-content" className="entrance-board" tabIndex={-1} aria-label="Entrance exhibit">
          <p className="eyebrow">JAMES LANE · AN INTERACTIVE EXHIBITION</p>
          <h1>Tools for<br />thinking<span className="ink-star" aria-hidden="true">✳</span></h1>
          <p>Three ideas that changed computing.<br />A small museum about building on them.</p>
          <div className="entrance-board__bottom"><button disabled={moving} onClick={onContinue}>{moving ? 'Arriving…' : 'Enter the exhibition'} <span aria-hidden="true">↗</span></button><span>5 stops / at your pace</span></div>
        </section>
      </Html>}
    </group>
  )
}
