import { describe, expect, it } from 'vitest'
import { PerspectiveCamera, Vector3 } from 'three'
import { fitStationCamera, portraitFrames } from './framing'
import { stations } from './stations'

describe('responsive exhibit framing', () => {
  for (const aspect of [0.05, 0.25, 0.5, 0.63, 1, 1.78, 3, 8]) {
    it(`keeps every portrait inside the camera at aspect ${aspect}`, () => {
      for (const station of stations) {
        if (station.id === 'entrance') continue
        const pose = fitStationCamera(station, aspect, 46)
        const camera = new PerspectiveCamera(46, aspect, pose.near, pose.far)
        camera.position.copy(pose.position)
        camera.lookAt(pose.target)
        camera.updateMatrixWorld()
        const { position: [x, y, z], scale: [width, height] } = portraitFrames[station.id]
        for (const dx of [-1, 1]) {
          for (const dy of [-1, 1]) {
            const corner = new Vector3(x + dx * width / 2, y + dy * height / 2, z).project(camera)
            expect(Math.abs(corner.x), `${station.id} horizontal crop`).toBeLessThan(0.87)
            expect(Math.abs(corner.y), `${station.id} vertical crop`).toBeLessThan(0.87)
            expect(corner.z, `${station.id} near clipping`).toBeGreaterThan(-1)
            expect(corner.z, `${station.id} far clipping`).toBeLessThan(1)
          }
        }
      }
    })
  }

  it('clips the previous gallery wall before it can obscure the active portrait', () => {
    const walls = { engelbart: [-5.8, 2.75, 0], kay: [-2.3, 2.75, -3], victor: [4, 2.75, -11], james: [7.7, 2.75, -19] }
    for (const station of stations) {
      if (station.id === 'entrance') continue
      const pose = fitStationCamera(station, 0.5, 46)
      const camera = new PerspectiveCamera(46, 0.5, pose.near, 70)
      camera.position.copy(pose.position)
      camera.lookAt(pose.target)
      camera.updateMatrixWorld()
      const wall = camera.worldToLocal(new Vector3(...walls[station.id]))
      expect(wall.z, `${station.id} foreground wall`).toBeGreaterThan(-camera.near)
    }
  })

  it('preserves the entrance camera and a valid pose after repeated aspect changes', () => {
    const entrance = fitStationCamera(stations[0], 0.5, 46)
    expect(entrance.position.toArray()).toEqual(stations[0].cameraPosition)
    expect(entrance.target.toArray()).toEqual(stations[0].cameraTarget)
    for (const aspect of [2, 0.5, 3, 1]) {
      const pose = fitStationCamera(stations[4], aspect, 46)
      expect([...pose.position.toArray(), ...pose.target.toArray(), pose.near].every(Number.isFinite)).toBe(true)
    }
  })
})
