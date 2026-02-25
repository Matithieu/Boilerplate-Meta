import dotenv from 'dotenv'

import { NNU } from '../utils/assertion.util'
import { Config } from './config.type'

dotenv.config({ path: __dirname + '/../../.env' })

function baseURL(): string {
  const env = NNU(process.env.BASE_URL, 'Please set the BASE_URL on the environment')

  return env.replace(/\/?$/, '')
}

export const config: Config = {
  BASE_URL: baseURL(),
  USERNAME: process.env.USERNAME ?? 'admin',
  PASSWORD: process.env.PASSWORD ?? 'password',
  PW_RUN_HEADLESS: process.env.PW_RUN_HEADLESS === '1',
  PW_DEFAULT_TIMEOUT:
    (process.env.PW_DEFAULT_TIMEOUT && parseInt(process.env.PW_DEFAULT_TIMEOUT)) ||
    (process.env.PWDEBUG !== '1' ? 15000 : 60 * 60 * 1000),
} as const
