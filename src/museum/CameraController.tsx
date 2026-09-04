import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import type { Station } from './stations'

type CameraControllerProps = {
  station: Station
  reducedMotion: boolean
  onArrival: () => void
}

const easeInOutCubic = (value: number) => value < 0.5
  ? 4 * value * value * value
  : 1 - Math.pow(-2 * value + 2, 3) / 2

export function CameraController({ station, reducedMotion, onArrival }: CameraControllerProps) {
  const { camera } = useThree()
  const startPosition = useRef(new Vector3(...station.cameraPosition))
  const startTarget = useRef(new Vector3(...station.cameraTarget))
  const currentTarget = useRef(new Vector3(...station.cameraTarget))
  const endPosition = useRef(new Vector3(...station.cameraPosition))
  const endTarget = useRef(new Vector3(...station.cameraTarget))
  const elapsed = useRef(0)
  const duration = useRef(0.01)
  const hasArrived = useRef(false)

  useEffect(() => {
    startPosition.current.copy(camera.position)
    startTarget.current.copy(currentTarget.current)
    endPosition.current.set(...station.cameraPosition)
    endTarget.current.set(...station.cameraTarget)
    elapsed.current = 0
    duration.current = reducedMotion ? 0.01 : 2.05
    hasArrived.current = false
  }, [camera, reducedMotion, station])

  useFrame((_, delta) => {
    elapsed.current += Math.min(delta, 0.05)
    const progress = Math.min(elapsed.current / duration.current, 1)
    const eased = easeInOutCubic(progress)
    camera.position.lerpVectors(startPosition.current, endPosition.current, eased)
    currentTarget.current.lerpVectors(startTarget.current, endTarget.current, eased)
    camera.lookAt(currentTarget.current)

    if (progress === 1 && !hasArrived.current) {
      hasArrived.current = true
      onArrival()
    }
  })

  return null
}
