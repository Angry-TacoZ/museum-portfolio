import { describe, expect, it } from 'vitest'
import { nextStation, stations } from './stations'

describe('museum route', () => {
  it('defines a complete five-station guided path', () => {
    expect(stations.map(({ id }) => id)).toEqual(['entrance', 'engelbart', 'kay', 'victor', 'james'])
    expect(nextStation('entrance')).toBe('engelbart')
    expect(nextStation('victor')).toBe('james')
    expect(nextStation('james')).toBeNull()
  })

  it('keeps every camera pose explicit and finite', () => {
    for (const station of stations) {
      expect(station.cameraPosition).toHaveLength(3)
      expect(station.cameraTarget).toHaveLength(3)
      expect([...station.cameraPosition, ...station.cameraTarget].every(Number.isFinite)).toBe(true)
    }
  })
})
