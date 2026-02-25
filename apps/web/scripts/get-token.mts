import 'dotenv/config'

import https from 'https'
import fetch from 'node-fetch'

const {
  BASE_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID,
  OAUTH2_PROXY_CLIENT_SECRET,
  KEYCLOAK_USERNAME,
  KEYCLOAK_PASSWORD,
} = process.env

const agent = new https.Agent({ rejectUnauthorized: false })

const tokenRes = await fetch(
  `${BASE_URL}/auth/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
  {
    agent,
    method: 'POST',
    body: new URLSearchParams({
      client_id: KEYCLOAK_CLIENT_ID!,
      client_secret: OAUTH2_PROXY_CLIENT_SECRET!,
      username: KEYCLOAK_USERNAME!,
      password: KEYCLOAK_PASSWORD!,
      grant_type: 'password',
      scope: 'openid',
    }),
  },
)

if (!tokenRes.ok) {
  console.error(
    JSON.stringify({
      status: tokenRes.status,
      statusText: tokenRes.statusText,
      body: await tokenRes.text(),
    }),
  )

  process.exit(1)
}

console.info(await tokenRes.text())
