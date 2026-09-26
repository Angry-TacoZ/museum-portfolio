import { describe, expect, it } from 'vitest'
import { PROJECTILE_BOUNDS, advanceProjectile, createProjectileState, getProjectileParameters, sampleProjectilePath, stepProjectile } from './projectile'

const defaults = { gravity: 5, velocity: 5, bounce: 4 }

describe('projectile simulation', () => {
  it('produces the same position at 30, 60, and 144 frames per second', () => {
    const run = (fps: number) => {
      let clock = { state: createProjectileState(defaults), remainder: 0 }
      for (let frame = 0; frame < fps * 2; frame++) clock = advanceProjectile(clock, defaults, 1 / fps)
      return clock.state
    }
    expect(run(30)).toEqual(run(60))
    expect(run(144)).toEqual(run(60))
  })

  it('bounds catch-up after a suspended tab', () => {
    const clock = { state: createProjectileState(defaults), remainder: 0 }
    expect(advanceProjectile(clock, defaults, 60)).toEqual(advanceProjectile(clock, defaults, .25))
  })
  it('maps controls to physically meaningful parameters', () => {
    expect(getProjectileParameters({ ...defaults, gravity: 10 }).gravity).toBeGreaterThan(getProjectileParameters({ ...defaults, gravity: 1 }).gravity)
    expect(getProjectileParameters({ ...defaults, velocity: 10 }).horizontalVelocity).toBeGreaterThan(getProjectileParameters({ ...defaults, velocity: 1 }).horizontalVelocity)
    expect(getProjectileParameters({ ...defaults, bounce: 8 }).restitution).toBeGreaterThan(getProjectileParameters({ ...defaults, bounce: 1 }).restitution)
  })

  it('moves left to right and remains inside the display bounds', () => {
    const points = sampleProjectilePath(defaults)
    expect(points.length).toBeGreaterThan(100)
    expect(points.every((point) => point.y >= PROJECTILE_BOUNDS.floorY && point.y <= PROJECTILE_BOUNDS.maxY)).toBe(true)
    expect(points.every((point, index) => index === 0 || point.x >= points[index - 1].x)).toBe(true)
  })

  it('makes low gravity arcs higher than high gravity arcs', () => {
    const lowPeak = Math.max(...sampleProjectilePath({ ...defaults, gravity: 1 }).map((point) => point.y))
    const highPeak = Math.max(...sampleProjectilePath({ ...defaults, gravity: 10 }).map((point) => point.y))
    expect(lowPeak).toBeGreaterThan(highPeak)
  })

  it('retains more vertical energy with a higher bounce setting', () => {
    const falling = { ...createProjectileState(defaults), y: PROJECTILE_BOUNDS.floorY + 0.01, vy: -2 }
    const lowBounce = stepProjectile(falling, { ...defaults, bounce: 1 }, 0.02)
    const highBounce = stepProjectile(falling, { ...defaults, bounce: 8 }, 0.02)
    expect(highBounce.vy).toBeGreaterThan(lowBounce.vy)
  })

  it('keeps every extreme slider combination finite and bounded', () => {
    for (const gravity of [1, 10]) for (const velocity of [1, 10]) for (const bounce of [1, 8]) {
      const points = sampleProjectilePath({ gravity, velocity, bounce })
      expect(points.every((point) => Number.isFinite(point.x) && Number.isFinite(point.y) && Number.isFinite(point.vy))).toBe(true)
      expect(points.every((point) => point.y >= PROJECTILE_BOUNDS.floorY && point.y <= PROJECTILE_BOUNDS.maxY)).toBe(true)
    }
  })
})
