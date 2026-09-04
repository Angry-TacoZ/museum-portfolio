import { ContinueTourSign } from '../interactions/ContinueTourSign'
import { IllustratedPlacard } from './IllustratedPlacard'

export function KayExhibit({ active, moving, shapeX, shapeScale, onContinue }: { active: boolean, moving: boolean, shapeX: number, shapeScale: number, onContinue: () => void }) {
  return (
    <group>
      <mesh position={[0, 0.72, -9.7]} castShadow><cylinderGeometry args={[1.7, 1.9, 1.4, 32]} /><meshStandardMaterial color="#242520" roughness={0.8} /></mesh>
      <group position={[0, 1.8, -10.1]} rotation={[-0.1, 0, 0]}>
        <mesh><boxGeometry args={[3.4, 2.1, 0.18]} /><meshStandardMaterial color="#ddd4c2" roughness={0.56} /></mesh>
        <mesh position={[0, 0, 0.11]}><planeGeometry args={[3.05, 1.75]} /><meshStandardMaterial color="#33423e" emissive="#152c27" emissiveIntensity={0.7} /></mesh>
        <mesh position={[shapeX, 0, 0.18]} scale={shapeScale}><boxGeometry args={[0.5, 0.5, 0.08]} /><meshStandardMaterial color="#e1a152" emissive="#b06b22" emissiveIntensity={0.5} /></mesh>
      </group>
      <mesh position={[0, 0.38, -8.95]} rotation={[-0.05, 0, 0]}><boxGeometry args={[3.35, 0.15, 1.6]} /><meshStandardMaterial color="#d1c7b5" /></mesh>
      {active && <IllustratedPlacard variant="kay" position={[1.85, 3.15, -10.68]} />}
      {active && <ContinueTourSign position={[0, 0.55, -10.3]} label="CONTINUE TOUR →" disabled={moving} onContinue={onContinue} />}
    </group>
  )
}
