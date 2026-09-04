import { MeshReflectorMaterial } from '@react-three/drei'

function Wall({ position, width = 9, unfinished = false }: { position: [number, number, number], width?: number, unfinished?: boolean }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[width, 5.7, 0.22]} />
      <meshStandardMaterial color={unfinished ? '#3c3932' : '#292a27'} roughness={0.9} />
    </mesh>
  )
}

export function MuseumEnvironment() {
  return (
    <group>
      <color attach="background" args={['#111210']} />
      <fog attach="fog" args={['#111210', 16, 47]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -12]} receiveShadow>
        <planeGeometry args={[34, 54]} />
        <MeshReflectorMaterial color="#1b1c19" roughness={0.86} metalness={0.04} blur={[350, 90]} resolution={512} mixBlur={0.7} mixStrength={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.5, -12]}>
        <planeGeometry args={[34, 54]} />
        <meshStandardMaterial color="#181916" roughness={1} />
      </mesh>
      <Wall position={[0, 2.75, 0]} width={12} />
      <Wall position={[-5.8, 2.75, -3]} width={8.5} />
      <Wall position={[0, 2.75, -11]} width={8.5} />
      <Wall position={[5.8, 2.75, -19]} width={8.5} />
      <Wall position={[5.8, 2.75, -29.5]} width={9.5} unfinished />
      {[-5.8, 0, 5.8].map((x, index) => (
        <mesh key={x} position={[x, 5.37, -3 - index * 8]}>
          <boxGeometry args={[3.2, 0.08, 0.5]} />
          <meshStandardMaterial color="#f0d6a8" emissive="#a87838" emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  )
}
