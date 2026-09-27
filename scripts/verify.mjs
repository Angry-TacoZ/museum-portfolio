import { spawnSync } from 'node:child_process'

// Fixed repository-owned commands; no caller-supplied shell input.
const checks = [
  { command: 'npm run lint' },
  { command: 'npm run test' },
  { command: 'npm run build' },
  { command: 'npm run test:browser' },
  { command: 'npm run build -- --base=/museum-portfolio/' },
  {
    command: 'npm run test:browser',
    env: { ...process.env, MUSEUM_TEST_BASE_PATH: '/museum-portfolio/' },
  },
]

for (const check of checks) {
  const result = spawnSync(check.command, { shell: true, stdio: 'inherit', env: check.env ?? process.env })
  if (result.error) console.error(result.error.message)
  if (result.status !== 0) process.exit(result.status ?? 1)
}
