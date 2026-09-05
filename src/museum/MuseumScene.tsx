import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { CameraController } from './CameraController'
import { MuseumEnvironment } from './MuseumEnvironment'
import { MuseumLighting } from './MuseumLighting'
import { EntranceExhibit } from './exhibits/EntranceExhibit'
import { EngelbartExhibit } from './exhibits/EngelbartExhibit'
import { KayExhibit } from './exhibits/KayExhibit'
import { VictorExhibit, type PhysicsValues } from './exhibits/VictorExhibit'
import { JamesExhibit } from './exhibits/JamesExhibit'
import type { Station } from './stations'

type MuseumSceneProps = {
  station: Station
  moving: boolean
  reducedMotion: boolean
  engelbartNode: number
  kayShape: { x: number, scale: number }
  physics: PhysicsValues
  onContinue: () => void
  onArrival: () => void
  forceFailure?: boolean
}

export function MuseumScene(props: MuseumSceneProps) {
  const { station, moving, reducedMotion, engelbartNode, kayShape, physics, onContinue, onArrival, forceFailure = false } = props
  if (forceFailure) throw new Error('Forced WebGL failure for fallback verification')
  return (
    <Canvas
      className="museum-canvas"
      dpr={[1, 1.5]}
      camera={{ position: station.cameraPosition, fov: 46, near: 0.1, far: 70 }}
      shadows
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <CameraController station={station} reducedMotion={reducedMotion} onArrival={onArrival} />
        <MuseumLighting />
        <MuseumEnvironment />
        <EntranceExhibit active={station.id === 'entrance'} moving={moving} onContinue={onContinue} />
        <EngelbartExhibit active={station.id === 'engelbart'} moving={moving} node={engelbartNode} onContinue={onContinue} />
        <KayExhibit active={station.id === 'kay'} moving={moving} shapeX={kayShape.x} shapeScale={kayShape.scale} onContinue={onContinue} />
        <VictorExhibit active={station.id === 'victor'} moving={moving} physics={physics} onContinue={onContinue} />
        <JamesExhibit active={station.id === 'james'} />
        <ContactShadows position={[0, 0, -13]} scale={32} opacity={0.14} blur={3.2} far={7} color="#565750" />
      </Suspense>
    </Canvas>
  )
}
