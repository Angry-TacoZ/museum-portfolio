import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

type ContinueTourSignProps = {
  position: [number, number, number]
  label: string
  disabled: boolean
  onContinue: () => void
  onPrevious: () => void
}

export function ContinueTourSign({ position, label, disabled, onContinue, onPrevious }: ContinueTourSignProps) {
  const height = useThree(state => state.size.height)
  return (
    <group position={position}>
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[3.2, 0.78, 0.11]} />
        <meshStandardMaterial color="#cac7be" roughness={1} metalness={0} />
      </mesh>
      {/* Project to screen space so CSS 3D depth cannot put hit targets behind the canvas. */}
      <Html center distanceFactor={height / 160} zIndexRange={[3, 0]}>
        <nav className="tour-signs" aria-label="Exhibit controls">
          <button className="tour-sign tour-sign--previous" disabled={disabled} onClick={onPrevious} aria-label="Previous exhibit">
            <span>← PREVIOUS</span>
          </button>
          <button className="tour-sign" disabled={disabled} onClick={onContinue} aria-label={label.replace('→', '').trim()}>
            <span>{disabled ? 'MOVING…' : label}</span>
            {!disabled && <small>Click to continue</small>}
          </button>
        </nav>
      </Html>
    </group>
  )
}
