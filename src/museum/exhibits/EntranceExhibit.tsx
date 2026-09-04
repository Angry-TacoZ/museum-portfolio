import { Edges } from '@react-three/drei'
import { ContinueTourSign } from '../interactions/ContinueTourSign'

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
      {active && <ContinueTourSign position={[0, 0.72, 0.48]} label="ENTER EXHIBIT →" disabled={moving} onContinue={onContinue} />}
    </group>
  )
}
