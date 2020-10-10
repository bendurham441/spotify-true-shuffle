import { config } from '../config'

export enum Method {
  GET = 'Get',
  POST = 'POST',
}

const genChallenge = async (verif: string) => {
  async function sha256(plain) {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)

    return window.crypto.subtle.digest('SHA-256', data)
  }

  function base64urlencode(a) {
    const base64 = btoa(
      String.fromCharCode.apply(null, new Uint8Array(a) as ArrayBuffer)
    )
    const urlencode = base64
      .replace('+', '-')
      .replace('/', '_')
      .replace(/=+$/, '')
    return urlencode
  }

  const hashed = await sha256(verif)
  const codeChallenge = base64urlencode(hashed)
  return codeChallenge
}

const verifier = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
localStorage.setItem('verifier', verifier)
const codeEndpoint = 'https://accounts.spotify.com/authorize'

const getCode = async () => {
  const challenge = await genChallenge(verifier)
  const tokenParams = new URLSearchParams({
    client_id: config.CLIENT_ID,
    response_type: 'code',
    redirect_uri: config.REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    scope: 'user-top-read user-library-read user-modify-playback-state',
  })

  window.location.href = `${codeEndpoint}?${tokenParams}`
}

const getToken = async (code: string) => {
  const tokenEndpoint = 'https://accounts.spotify.com/api/token'
  const tokenParams = new URLSearchParams({
    client_id: config.CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: config.REDIRECT_URI,
    code_verifier: localStorage.getItem('verifier'),
  })

  const request = await fetch(`${tokenEndpoint}?${tokenParams}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const data = await request.json()
  console.log(data)
  localStorage.setItem('token', data.access_token)
  localStorage.setItem('refresh', data.refresh_token)
}

const makeRequest = async (
  endpoint: string,
  method?: Method,
  params?: URLSearchParams
) => {
  const urlBase = 'https://api.spotify.com/v1'
  const request = await fetch(`${urlBase + endpoint}?${params.toString()}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  const data = await request.json()
  return data
}

const tokenEndpoint = 'https://accounts.spotify.com/api/token'

const refresh = async () => {
  const refreshParams = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: localStorage.getItem('refresh'),
    client_id: config.CLIENT_ID,
  })
  const request = await fetch(`${tokenEndpoint}?${refreshParams}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const data = await request.json()
  console.log(data)
}

export { getCode, getToken, makeRequest, refresh }
