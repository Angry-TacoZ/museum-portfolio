import { Edges, MeshReflectorMaterial } from '@react-three/drei'

function Wall({ position, width = 9, unfinished = false }: { position: [number, number, number], width?: number, unfinished?: boolean }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[width, 5.7, 0.22]} />
      <meshStandardMaterial color={unfinished ? '#d7d3c9' : '#ebe8df'} roughness={0.98} />
      <Edges color="#292a27" threshold={12} />
    </mesh>
  )
}

export function MuseumEnvironment() {
  return (
    <group>
      <color attach="background" args={['#efede6']} />
      <fog attach="fog" args={['#efede6', 20, 52]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -12]} receiveShadow>
        <planeGeometry args={[34, 54]} />
        <MeshReflectorMaterial color="#d9d6cd" roughness={0.96} metalness={0} blur={[260, 80]} resolution={256} mixBlur={0.5} mixStrength={0.08} />
      </mesh>
      <gridHelper args={[54, 54, '#aaa8a1', '#cfccc3']} position={[0, 0.006, -12]} />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.5, -12]}>
        <planeGeometry args={[34, 54]} />
        <meshStandardMaterial color="#f3f1ea" roughness={1} />
      </mesh>
      <Wall position={[0, 2.75, 0]} width={12} />
      <Wall position={[-5.8, 2.75, -3]} width={8.5} />
      <Wall position={[0, 2.75, -11]} width={8.5} />
      <Wall position={[5.8, 2.75, -19]} width={8.5} />
      <Wall position={[5.8, 2.75, -29.5]} width={9.5} unfinished />
      {[-5.8, 0, 5.8].map((x, index) => (
        <mesh key={x} position={[x, 5.37, -3 - index * 8]}>
          <boxGeometry args={[3.2, 0.08, 0.5]} />
          <meshStandardMaterial color="#b9ddec" emissive="#8fc6dc" emissiveIntensity={0.2} />
          <Edges color="#292a27" threshold={10} />
        </mesh>
      ))}
    </group>
  )
}
