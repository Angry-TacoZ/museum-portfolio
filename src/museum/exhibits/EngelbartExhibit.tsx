import { Line } from '@react-three/drei'
import { ContinueTourSign } from '../interactions/ContinueTourSign'
import { IllustratedPlacard } from './IllustratedPlacard'

export function EngelbartExhibit({ active, moving, node, onContinue }: { active: boolean, moving: boolean, node: number, onContinue: () => void }) {
  const points: [number, number, number][] = [[-7.4, 2.7, -2.72], [-6.7, 3.35, -2.72], [-5.8, 2.72, -2.72], [-4.9, 3.28, -2.72]]
  return (
    <group>
      <mesh position={[-7.85, 2.15, -2.73]}><boxGeometry args={[1.6, 2.35, 0.16]} /><meshStandardMaterial color="#151613" /></mesh>
      <mesh position={[-7.85, 2.2, -2.59]}><planeGeometry args={[1.28, 1.65]} /><meshStandardMaterial color="#4d514b" /></mesh>
      <mesh position={[-6, 0.63, -2.2]} castShadow><boxGeometry args={[3.8, 0.16, 1.2]} /><meshStandardMaterial color="#3b3328" roughness={0.75} /></mesh>
      <mesh position={[-6, 1.25, -2.58]}><boxGeometry args={[1.6, 1.15, 0.25]} /><meshStandardMaterial color="#202722" /></mesh>
      <mesh position={[-6, 1.25, -2.42]}><planeGeometry args={[1.28, 0.82]} /><meshStandardMaterial color="#718a72" emissive="#243a28" emissiveIntensity={0.65} /></mesh>
      <mesh position={[-4.55, 0.85, -2.05]} rotation={[0, 0.18, 0]}><boxGeometry args={[0.38, 0.16, 0.58]} /><meshStandardMaterial color="#d2c8b8" /></mesh>
      <Line points={points} color="#c48b4e" lineWidth={1.2} />
      {points.map((point, index) => <mesh key={index} position={point}><sphereGeometry args={[index === node ? 0.14 : 0.09, 16, 16]} /><meshStandardMaterial color={index === node ? '#f0b461' : '#817868'} emissive={index === node ? '#f0a64a' : '#000000'} emissiveIntensity={1.2} /></mesh>)}
      {active && <IllustratedPlacard variant="engelbart" position={[-4.7, 3.15, -2.48]} />}
      {active && <ContinueTourSign position={[-5.8, 0.55, -2.28]} label="CONTINUE TOUR →" disabled={moving} onContinue={onContinue} />}
    </group>
  )
}
