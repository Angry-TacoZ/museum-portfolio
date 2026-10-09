import { Edges, Line } from '@react-three/drei'
import { ContinueTourSign } from '../interactions/ContinueTourSign'
import { IllustratedPlacard } from './IllustratedPlacard'
import { PortraitMural } from './PortraitMural'
import { portraitFrames } from '../framing'

export function EngelbartExhibit({ active, moving, node, onContinue }: { active: boolean, moving: boolean, node: number, onContinue: () => void }) {
  // Keep the entire network to the right of the portrait, including selected-node radii.
  const points: [number, number, number][] = [[-6.7, 2.7, -2.72], [-6, 3.35, -2.72], [-5.3, 2.72, -2.72], [-4.6, 3.28, -2.72]]
  return (
    <group>
      <PortraitMural image={`${import.meta.env.BASE_URL}portraits/douglas-engelbart-ink.png`} {...portraitFrames.engelbart} opacity={0.75} />
      <mesh position={[-7.85, 2.15, -2.73]}><boxGeometry args={[1.6, 2.35, 0.16]} /><meshStandardMaterial color="#efede5" roughness={1} /><Edges color="#272823" threshold={10} /></mesh>
      <mesh position={[-7.85, 2.2, -2.59]}><planeGeometry args={[1.28, 1.65]} /><meshStandardMaterial color="#b8b8b2" roughness={1} /></mesh>
      <mesh position={[-6, 0.63, -2.2]} castShadow><boxGeometry args={[3.8, 0.16, 1.2]} /><meshStandardMaterial color="#c7c4bb" roughness={0.95} /><Edges color="#272823" threshold={10} /></mesh>
      <mesh position={[-6, 1.25, -2.58]}><boxGeometry args={[1.6, 1.15, 0.25]} /><meshStandardMaterial color="#e4e2d9" roughness={1} /><Edges color="#272823" threshold={10} /></mesh>
      <mesh position={[-6, 1.25, -2.42]}><planeGeometry args={[1.28, 0.82]} /><meshStandardMaterial color="#d5eaf2" roughness={1} /></mesh>
      <mesh position={[-4.55, 0.85, -2.05]} rotation={[0, 0.18, 0]}><boxGeometry args={[0.38, 0.16, 0.58]} /><meshStandardMaterial color="#f2f0e8" roughness={1} /><Edges color="#272823" threshold={10} /></mesh>
      <Line points={points} color="#72aac3" lineWidth={1.4} />
      {points.map((point, index) => <mesh key={index} position={point}><sphereGeometry args={[index === node ? 0.14 : 0.09, 16, 16]} /><meshStandardMaterial color={index === node ? '#8fc8df' : '#5e605a'} roughness={1} /><Edges color="#272823" threshold={10} /></mesh>)}
      {active && <IllustratedPlacard variant="engelbart" position={[-4.7, 1.95, -2.48]} />}
      {active && <ContinueTourSign position={[-5.8, 0.55, -2.28]} label="CONTINUE TOUR →" disabled={moving} onContinue={onContinue} />}
    </group>
  )
}
