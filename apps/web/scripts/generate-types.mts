import { execSync, spawnSync } from 'node:child_process'
import { Command } from 'commander'

const program = new Command()

program
  .name('generate-types')
  .description(
    'Generate types for the queries in the project. The scripts authenticates against the server before fetching the schemas.',
  )
  .version('0.0.1')

program.argument('<script to run after authentication>')
program.parse()

const tokens = JSON.parse(
  execSync(`node ./scripts/build/get-token.mjs`, {
    encoding: 'utf-8',
  }),
) as { access_token: string }
console.info('Got the authentication token...')

const scriptToRun = program.args[0]

if (!scriptToRun) {
  console.error('No script argument provided')
  process.exit(1)
}

spawnSync('pnpm', ['run', scriptToRun], {
  shell: true,
  stdio: 'inherit',
  env: {
    ...process.env,
    AUTH_TOKEN: tokens.access_token,
  },
  encoding: 'utf-8',
})
