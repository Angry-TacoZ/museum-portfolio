import { Html } from '@react-three/drei'

type ContinueTourSignProps = {
  position: [number, number, number]
  label: string
  disabled: boolean
  onContinue: () => void
}

export function ContinueTourSign({ position, label, disabled, onContinue }: ContinueTourSignProps) {
  return (
    <group position={position}>
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[3.2, 0.78, 0.11]} />
        <meshStandardMaterial color="#9b8f7a" roughness={0.88} metalness={0.02} />
      </mesh>
      <Html center transform distanceFactor={3.65} zIndexRange={[20, 0]}>
        <button className="tour-sign" disabled={disabled} onClick={onContinue} aria-label={label.replace('→', '').trim()}>
          <span>{disabled ? 'MOVING…' : label}</span>
          {!disabled && <small>Click to continue</small>}
        </button>
      </Html>
    </group>
  )
}
