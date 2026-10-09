import { Box3, Vector3 } from 'three'
import type { Station, StationId } from './stations'

type ExhibitId = Exclude<StationId, 'entrance'>
type Point = [number, number, number]

// Shared with the rendered murals so framing tests use the actual portrait geometry.
export const portraitFrames: Record<ExhibitId, { position: Point, scale: [number, number] }> = {
  engelbart: { position: [-7.8, 2.5, -2.4], scale: [1.6, 2] },
  kay: { position: [-2.8, 2.8, -10.5], scale: [1.6, 2] },
  victor: { position: [9.3, 2, -18.48], scale: [1.2, 1.5] },
  james: { position: [7.7, 1.78, -28.88], scale: [1.22, 1.72] },
}

// Include the portrait, interactive object, placard, and tour sign in each composition.
const exhibitBounds: Record<ExhibitId, { min: Point, max: Point }> = {
  engelbart: { min: [-8.8, 0.1, -2.9], max: [-3.4, 3.8, -1.6] },
  kay: { min: [-3.7, 0.1, -10.8], max: [3.2, 4.2, -8.1] },
  victor: { min: [2.8, 0.2, -18.9], max: [10, 4.2, -18] },
  james: { min: [2.5, 0.05, -29.4], max: [9.8, 4.3, -27.2] },
}

export function fitStationCamera(station: Station, aspect: number, fov: number) {
  const originalPosition = new Vector3(...station.cameraPosition)
  const originalTarget = new Vector3(...station.cameraTarget)
  if (station.id === 'entrance') return { position: originalPosition, target: originalTarget, near: 0.1, far: 70 }

  const bounds = exhibitBounds[station.id]
  const box = new Box3(new Vector3(...bounds.min), new Vector3(...bounds.max))
  const target = box.getCenter(new Vector3())
  const back = originalPosition.clone().sub(originalTarget).normalize()
  const right = new Vector3(0, 1, 0).cross(back).normalize()
  const up = back.clone().cross(right)
  const verticalSlope = Math.tan(fov * Math.PI / 360) * 0.86
  const horizontalSlope = verticalSlope * Math.max(aspect, 0.01)
  let distance = originalPosition.distanceTo(originalTarget)
  let nearestDepth = -Infinity
  let farthestDepth = Infinity

  for (const x of [box.min.x, box.max.x]) {
    for (const y of [box.min.y, box.max.y]) {
      for (const z of [box.min.z, box.max.z]) {
        const offset = new Vector3(x, y, z).sub(target)
        const depth = offset.dot(back)
        distance = Math.max(distance, depth + Math.abs(offset.dot(right)) / horizontalSlope,
          depth + Math.abs(offset.dot(up)) / verticalSlope)
        nearestDepth = Math.max(nearestDepth, depth)
        farthestDepth = Math.min(farthestDepth, depth)
      }
    }
  }

  return {
    position: target.clone().addScaledVector(back, distance),
    target,
    // Exclude earlier gallery walls when a narrow canvas needs a more distant camera.
    // Leave room in front of the whole active installation, including its HTML signs.
    near: Math.max(0.1, distance - nearestDepth - 0.65),
    far: Math.max(70, distance - farthestDepth + 0.65),
  }
}
