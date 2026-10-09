import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Vector3 } from 'three'
import type { Station } from './stations'
import { fitStationCamera } from './framing'

type CameraControllerProps = {
  station: Station
  reducedMotion: boolean
  onArrival: () => void
}

const easeInOutCubic = (value: number) => value < 0.5
  ? 4 * value * value * value
  : 1 - Math.pow(-2 * value + 2, 3) / 2

export function CameraController({ station, reducedMotion, onArrival }: CameraControllerProps) {
  const { camera, size } = useThree()
  const fov = camera instanceof PerspectiveCamera ? camera.getEffectiveFOV() : 46
  const startPosition = useRef(new Vector3(...station.cameraPosition))
  const startTarget = useRef(new Vector3(...station.cameraTarget))
  const currentTarget = useRef(new Vector3(...station.cameraTarget))
  const endPosition = useRef(new Vector3(...station.cameraPosition))
  const endTarget = useRef(new Vector3(...station.cameraTarget))
  const elapsed = useRef(0)
  const duration = useRef(0.01)
  const hasArrived = useRef(false)
  const previousStation = useRef<Station | null>(null)
  const startNear = useRef(camera.near)
  const endNear = useRef(camera.near)
  const startFar = useRef(camera.far)
  const endFar = useRef(camera.far)

  useEffect(() => {
    startPosition.current.copy(camera.position)
    startTarget.current.copy(currentTarget.current)
    const pose = fitStationCamera(station, size.width / Math.max(size.height, 1), fov)
    endPosition.current.copy(pose.position)
    endTarget.current.copy(pose.target)
    startNear.current = camera.near
    endNear.current = pose.near
    startFar.current = camera.far
    endFar.current = pose.far
    elapsed.current = 0
    duration.current = reducedMotion ? 0.01 : previousStation.current === station ? 0.18 : 2.05
    previousStation.current = station
    hasArrived.current = false
  }, [camera, reducedMotion, station, size.width, size.height, fov])

  useFrame((_, delta) => {
    // Preserve the intended wall-clock duration when a large WebGL viewport drops frames.
    elapsed.current += delta
    const progress = Math.min(elapsed.current / duration.current, 1)
    const eased = easeInOutCubic(progress)
    camera.position.lerpVectors(startPosition.current, endPosition.current, eased)
    currentTarget.current.lerpVectors(startTarget.current, endTarget.current, eased)
    camera.lookAt(currentTarget.current)
    const near = startNear.current + (endNear.current - startNear.current) * eased
    const far = startFar.current + (endFar.current - startFar.current) * eased
    if (camera.near !== near || camera.far !== far) {
      camera.near = near
      camera.far = far
      camera.updateProjectionMatrix()
    }

    if (progress === 1 && !hasArrived.current) {
      hasArrived.current = true
      onArrival()
    }
  })

  return null
}
