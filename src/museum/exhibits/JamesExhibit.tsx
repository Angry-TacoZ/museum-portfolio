import { Edges, Html } from '@react-three/drei'
import { IllustratedPlacard } from './IllustratedPlacard'
import { TargetedSpotLight } from '../TargetedSpotLight'
import { PortraitMural } from './PortraitMural'
import { ConstructionTape } from './ConstructionTape'
import { portraitFrames } from '../framing'

export function JamesExhibit({ active }: { active: boolean }) {
  return (
    <group>
      {[-3.7, -2.8, -1.9, -1, -0.1, 0.8, 1.7, 2.6, 3.5].map((offset) => (
        <mesh key={offset} position={[5.8 + offset, 2.6, -29.22]}><boxGeometry args={[0.11, 5.1, 0.16]} /><meshStandardMaterial color="#777972" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
      ))}
      <mesh position={[5.8, 0.65, -28.25]} castShadow><boxGeometry args={[2.3, 1.3, 1.55]} /><meshStandardMaterial color="#c1beb5" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
      <ConstructionTape position={[5.8, 0.83, -27.465]} rotation={[0, 0, -0.065]} />
      <ConstructionTape position={[5.8, 1.31, -28.25]} rotation={[-Math.PI / 2, 0, 0.14]} />
      <mesh position={[3.65, 0.45, -28.8]} rotation={[0, 0.25, 0]} castShadow><boxGeometry args={[1.5, 0.9, 1.2]} /><meshStandardMaterial color="#d6d3ca" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
      <mesh position={[7.7, 1.75, -29]}><boxGeometry args={[1.55, 2.35, 0.18]} /><meshStandardMaterial color="#d5d2c9" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
      <PortraitMural image={`${import.meta.env.BASE_URL}portraits/james-lane-ink.webp`} {...portraitFrames.james} opacity={1} />
      {active && (
        <Html position={[7.7, 0.72, -28.65]} center transform distanceFactor={4}>
          <div className="portrait-label">JAMES LANE</div>
        </Html>
      )}
      {active && <IllustratedPlacard variant="james" position={[5.25, 3.15, -29.03]} />}
      <group position={[8.8, 1.5, -28.1]} rotation={[0, 0, -0.13]}>
        {[0, 0.58].map((x) => <mesh key={x} position={[x, 0, 0]}><boxGeometry args={[0.09, 3.1, 0.1]} /><meshStandardMaterial color="#a3a49e" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>)}
        {[-1.2, -0.65, -0.1, 0.45, 1].map((y) => <mesh key={y} position={[0.29, y, 0]}><boxGeometry args={[0.72, 0.07, 0.1]} /><meshStandardMaterial color="#a3a49e" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>)}
      </group>
      <TargetedSpotLight position={[3.3, 3.5, -26.5]} target={[5.8, 1, -29]} intensity={10} angle={0.55} penumbra={0.6} color="#d9edf5" />
    </group>
  )
}
