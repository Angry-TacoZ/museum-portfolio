import { Html } from '@react-three/drei'

export function JamesExhibit({ active }: { active: boolean }) {
  return (
    <group>
      {[-3.7, -2.8, -1.9, -1, -0.1, 0.8, 1.7, 2.6, 3.5].map((offset) => (
        <mesh key={offset} position={[5.8 + offset, 2.6, -29.22]}><boxGeometry args={[0.11, 5.1, 0.16]} /><meshStandardMaterial color="#a37e4f" roughness={0.88} /></mesh>
      ))}
      <mesh position={[5.8, 0.65, -28.25]} castShadow><boxGeometry args={[2.3, 1.3, 1.55]} /><meshStandardMaterial color="#4a4133" /></mesh>
      <mesh position={[3.65, 0.45, -28.8]} rotation={[0, 0.25, 0]} castShadow><boxGeometry args={[1.5, 0.9, 1.2]} /><meshStandardMaterial color="#6c5940" /></mesh>
      <mesh position={[7.7, 1.75, -29]}><boxGeometry args={[1.55, 2.35, 0.18]} /><meshStandardMaterial color="#1d1e1b" /></mesh>
      <mesh position={[7.7, 1.78, -28.88]}><planeGeometry args={[1.22, 1.72]} /><meshStandardMaterial color="#595b55" /></mesh>
      {active && (
        <Html position={[7.7, 0.72, -28.65]} center transform distanceFactor={4}>
          <div className="portrait-label">JAMES LANE</div>
        </Html>
      )}
      <group position={[8.8, 1.5, -28.1]} rotation={[0, 0, -0.13]}>
        {[0, 0.58].map((x) => <mesh key={x} position={[x, 0, 0]}><boxGeometry args={[0.09, 3.1, 0.1]} /><meshStandardMaterial color="#c2b08f" /></mesh>)}
        {[-1.2, -0.65, -0.1, 0.45, 1].map((y) => <mesh key={y} position={[0.29, y, 0]}><boxGeometry args={[0.72, 0.07, 0.1]} /><meshStandardMaterial color="#c2b08f" /></mesh>)}
      </group>
      <spotLight position={[3.3, 3.5, -26.5]} target-position={[5.8, 1, -29]} intensity={26} angle={0.55} penumbra={0.45} color="#ffbd6b" />
    </group>
  )
}
