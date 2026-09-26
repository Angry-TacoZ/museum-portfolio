import { Edges } from '@react-three/drei'
import { ContinueTourSign } from '../interactions/ContinueTourSign'
import { IllustratedPlacard } from './IllustratedPlacard'
import { PortraitMural } from './PortraitMural'

export function KayExhibit({ active, moving, shapeX, shapeScale, onContinue }: { active: boolean, moving: boolean, shapeX: number, shapeScale: number, onContinue: () => void }) {
  return (
    <group>
      <PortraitMural image="/portraits/alan-kay-ink.png" position={[-2.3, 2.8, -10.5]} scale={[1.6, 2]} opacity={0.75} />
      <mesh position={[0, 0.72, -9.7]} castShadow><cylinderGeometry args={[1.7, 1.9, 1.4, 32]} /><meshStandardMaterial color="#c8c5bc" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
      <group position={[0, 1.8, -10.1]} rotation={[-0.1, 0, 0]}>
        <mesh><boxGeometry args={[3.4, 2.1, 0.18]} /><meshStandardMaterial color="#efede5" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
        <mesh position={[0, 0, 0.11]}><planeGeometry args={[3.05, 1.75]} /><meshStandardMaterial color="#dcdad2" roughness={1} /></mesh>
        <mesh position={[shapeX, 0, 0.18]} scale={shapeScale}><boxGeometry args={[0.5, 0.5, 0.08]} /><meshStandardMaterial color="#97cde3" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
      </group>
      <mesh position={[0, 0.38, -8.95]} rotation={[-0.05, 0, 0]}><boxGeometry args={[3.35, 0.15, 1.6]} /><meshStandardMaterial color="#e8e5dc" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
      {active && <IllustratedPlacard variant="kay" position={[1.85, 3.15, -10.68]} />}
      {active && <ContinueTourSign position={[0, 0.55, -10.3]} label="CONTINUE TOUR →" disabled={moving} onContinue={onContinue} />}
    </group>
  )
}
