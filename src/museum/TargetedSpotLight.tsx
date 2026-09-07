import { useLayoutEffect, useMemo, useRef } from 'react'
import { Object3D, SpotLight } from 'three'

type Props = {
  position: [number, number, number]
  target: [number, number, number]
  intensity: number
  angle: number
  penumbra: number
  color: string
}

export function TargetedSpotLight({ position, target: targetPosition, ...lightProps }: Props) {
  const light = useRef<SpotLight>(null)
  const target = useMemo(() => new Object3D(), [])
  target.position.set(...targetPosition)

  useLayoutEffect(() => {
    if (light.current) light.current.target = target
  }, [target])

  return (
    <>
      <primitive object={target} />
      <spotLight ref={light} position={position} {...lightProps} />
    </>
  )
}
