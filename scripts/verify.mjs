import { spawnSync } from 'node:child_process'

// Fixed repository-owned commands; no caller-supplied shell input.
for (const check of ['lint', 'test', 'build', 'test:browser']) {
  const result = spawnSync(`npm run ${check}`, { shell: true, stdio: 'inherit' })
  if (result.error) console.error(result.error.message)
  if (result.status !== 0) process.exit(result.status ?? 1)
}
