import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { Edges } from '@react-three/drei'
import { ContinueTourSign } from '../interactions/ContinueTourSign'
import { IllustratedPlacard } from './IllustratedPlacard'
import { PortraitMural } from './PortraitMural'
import { advanceProjectile, createProjectileState, type PhysicsValues } from '../physics/projectile'

export type { PhysicsValues } from '../physics/projectile'

export function VictorExhibit({ active, moving, physics, reducedMotion, onContinue }: { active: boolean, moving: boolean, physics: PhysicsValues, reducedMotion: boolean, onContinue: () => void }) {
  const ball = useRef<Mesh>(null)
  const clock = useRef({ state: createProjectileState(physics), remainder: 0 })

  useEffect(() => {
    clock.current = { state: createProjectileState(physics), remainder: 0 }
  }, [physics])

  useFrame((_, delta) => {
    if (active && !reducedMotion) clock.current = advanceProjectile(clock.current, physics, delta)
    if (ball.current) ball.current.position.set(5.8 + clock.current.state.x, clock.current.state.y, -18.38)
  })
  return (
    <group>
      <mesh position={[5.8, 2.25, -18.72]}><boxGeometry args={[5.7, 3.5, 0.2]} /><meshStandardMaterial color="#cbc8bf" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
      <mesh position={[5.8, 2.3, -18.58]}><planeGeometry args={[4.9, 2.72]} /><meshStandardMaterial color="#e8e6de" roughness={1} /></mesh>
      <PortraitMural image="/portraits/bret-victor-ink.png" position={[8.05, 2, -18.48]} scale={[1.2, 1.5]} opacity={0.65} />
      <mesh ref={ball} position={[3.72, 1.16, -18.38]} castShadow><sphereGeometry args={[0.2, 24, 24]} /><meshStandardMaterial color="#91cbe2" roughness={1} /><Edges color="#292a26" threshold={10} /></mesh>
      <mesh position={[5.26, 0.93, -18.4]}><boxGeometry args={[3.1, 0.06, 0.08]} /><meshStandardMaterial color="#282924" /></mesh>
      {[4, 4.65, 5.3, 5.95, 6.6].map((x) => <mesh key={x} position={[x, 1.15, -18.35]}><boxGeometry args={[0.025, 0.22, 0.04]} /><meshStandardMaterial color="#282924" /></mesh>)}
      {active && <IllustratedPlacard variant="victor" position={[7.45, 3.15, -18.3]} physics={physics} />}
      {active && <ContinueTourSign position={[5.8, 0.55, -18.3]} label="ONE EXHIBIT REMAINS →" disabled={moving} onContinue={onContinue} />}
    </group>
  )
}
