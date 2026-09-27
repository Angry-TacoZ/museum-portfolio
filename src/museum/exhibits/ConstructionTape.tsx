import { useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import { DoubleSide, SRGBColorSpace } from 'three'
import tapeImage from './construction-tape.svg'

export function ConstructionTape({ position, rotation }: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  const texture = useTexture(tapeImage)

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
  }, [texture])

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[2.18, 0.205]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.1} side={DoubleSide} toneMapped={false} />
    </mesh>
  )
}
