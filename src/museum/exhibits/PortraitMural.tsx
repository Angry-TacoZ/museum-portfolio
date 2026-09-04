import { useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import { DoubleSide, SRGBColorSpace } from 'three'

type PortraitMuralProps = {
  image: string
  position: [number, number, number]
  scale?: [number, number]
  opacity?: number
}

export function PortraitMural({ image, position, scale = [3.75, 4.7], opacity = 0.48 }: PortraitMuralProps) {
  const texture = useTexture(image)

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
  }, [texture])

  return (
    <mesh position={position} renderOrder={1}>
      <planeGeometry args={scale} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} alphaTest={0.02} depthWrite={false} side={DoubleSide} toneMapped={false} />
    </mesh>
  )
}
