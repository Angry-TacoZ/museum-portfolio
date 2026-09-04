export type PhysicsValues = { gravity: number, velocity: number, bounce: number }

export type ProjectileState = {
  x: number
  y: number
  vy: number
}

export const PROJECTILE_BOUNDS = {
  minX: -2.08,
  maxX: 1,
  floorY: 1.16,
  maxY: 3.42,
} as const

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const mapRange = (value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) => {
  const progress = (clamp(value, inputMin, inputMax) - inputMin) / (inputMax - inputMin)
  return outputMin + progress * (outputMax - outputMin)
}

export function getProjectileParameters(values: PhysicsValues) {
  return {
    gravity: mapRange(values.gravity, 1, 10, 2.8, 9.2),
    horizontalVelocity: mapRange(values.velocity, 1, 10, 0.65, 1.25),
    launchVelocity: mapRange(values.velocity, 1, 10, 3, 3.3),
    restitution: mapRange(values.bounce, 1, 8, 0.28, 0.82),
  }
}

export function createProjectileState(values: PhysicsValues): ProjectileState {
  return {
    x: PROJECTILE_BOUNDS.minX,
    y: PROJECTILE_BOUNDS.floorY,
    vy: getProjectileParameters(values).launchVelocity,
  }
}

export function stepProjectile(state: ProjectileState, values: PhysicsValues, elapsedSeconds: number): ProjectileState {
  const dt = clamp(elapsedSeconds, 0, 0.05)
  const parameters = getProjectileParameters(values)
  const next = {
    x: state.x + parameters.horizontalVelocity * dt,
    y: state.y + state.vy * dt,
    vy: state.vy - parameters.gravity * dt,
  }

  if (next.y <= PROJECTILE_BOUNDS.floorY && next.vy < 0) {
    next.y = PROJECTILE_BOUNDS.floorY
    next.vy = Math.abs(next.vy) * parameters.restitution
  }

  if (next.x > PROJECTILE_BOUNDS.maxX) return createProjectileState(values)
  next.y = clamp(next.y, PROJECTILE_BOUNDS.floorY, PROJECTILE_BOUNDS.maxY)
  return next
}

export function sampleProjectilePath(values: PhysicsValues, stepSeconds = 1 / 90): ProjectileState[] {
  const points = [createProjectileState(values)]
  let state = points[0]
  for (let index = 0; index < 900; index += 1) {
    const next = stepProjectile(state, values, stepSeconds)
    if (next.x < state.x) break
    points.push(next)
    state = next
  }
  return points
}

type TrajectoryViewport = { left: number, right: number, floor: number, ceiling: number }

export function projectileSvgPoints(values: PhysicsValues, viewport: TrajectoryViewport = { left: 16, right: 262, floor: 54, ceiling: 12 }) {
  return sampleProjectilePath(values).map((point) => ({
    x: viewport.left + ((point.x - PROJECTILE_BOUNDS.minX) / (PROJECTILE_BOUNDS.maxX - PROJECTILE_BOUNDS.minX)) * (viewport.right - viewport.left),
    y: viewport.floor - ((point.y - PROJECTILE_BOUNDS.floorY) / (PROJECTILE_BOUNDS.maxY - PROJECTILE_BOUNDS.floorY)) * (viewport.floor - viewport.ceiling),
  }))
}

export function projectileSvgPath(values: PhysicsValues, viewport?: TrajectoryViewport) {
  return projectileSvgPoints(values, viewport).map((point, index) => (
    `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`
  )).join(' ')
}
