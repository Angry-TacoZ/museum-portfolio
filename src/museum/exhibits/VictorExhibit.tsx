import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { ContinueTourSign } from '../interactions/ContinueTourSign'
import { IllustratedPlacard } from './IllustratedPlacard'

export type PhysicsValues = { gravity: number, velocity: number, bounce: number }

export function VictorExhibit({ active, moving, physics, onContinue }: { active: boolean, moving: boolean, physics: PhysicsValues, onContinue: () => void }) {
  const ball = useRef<Mesh>(null)
  const time = useRef(0)
  useFrame((_, delta) => {
    time.current += delta * (0.55 + physics.velocity / 10)
    const wave = Math.abs(Math.sin(time.current))
    const shaped = Math.pow(wave, 0.72 + physics.gravity / 12)
    if (ball.current) ball.current.position.y = 0.85 + shaped * (1.2 + physics.bounce * 0.18)
  })
  return (
    <group>
      <mesh position={[5.8, 2.25, -18.72]}><boxGeometry args={[5.7, 3.5, 0.2]} /><meshStandardMaterial color="#24241f" /></mesh>
      <mesh position={[5.8, 2.3, -18.58]}><planeGeometry args={[4.9, 2.72]} /><meshStandardMaterial color="#33362f" emissive="#151914" emissiveIntensity={0.35} roughness={0.9} /></mesh>
      <mesh ref={ball} position={[5.8, 2, -18.38]} castShadow><sphereGeometry args={[0.24, 24, 24]} /><meshStandardMaterial color="#d66243" emissive="#9c3521" emissiveIntensity={0.35} /></mesh>
      <mesh position={[5.8, 0.72, -18.4]}><boxGeometry args={[3.8, 0.06, 0.08]} /><meshStandardMaterial color="#282924" /></mesh>
      {[4.6, 5.2, 5.8, 6.4, 7].map((x) => <mesh key={x} position={[x, 0.82, -18.35]}><boxGeometry args={[0.025, 0.22, 0.04]} /><meshStandardMaterial color="#282924" /></mesh>)}
      {active && <IllustratedPlacard variant="victor" position={[7.45, 3.15, -18.3]} />}
      {active && <ContinueTourSign position={[5.8, 0.55, -18.3]} label="ONE EXHIBIT REMAINS →" disabled={moving} onContinue={onContinue} />}
    </group>
  )
}
