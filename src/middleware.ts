import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getDynamicCredentials } from './utils/dynamic'

// Helper function to decode base64URL
function base64UrlDecode(input: string): Uint8Array {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const base64Padded = base64 + padding

  const rawData = atob(base64Padded)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}

async function verifyJWT(token: string, publicKey: string) {
  try {
    // Split the token into parts
    const [headerB64, payloadB64, signatureB64] = token.split('.')

    if (!headerB64 || !payloadB64 || !signatureB64) {
      throw new Error('Invalid token format')
    }

    // Decode and validate header before signature verification
    const header = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(headerB64)),
    )

    // Validate algorithm and token type
    if (header.alg !== 'RS256' || header.typ !== 'JWT') {
      throw new Error('Invalid token algorithm or type')
    }

    // Verify the signature
    const encoder = new TextEncoder()
    const data = encoder.encode(`${headerB64}.${payloadB64}`)
    const signatureProvided = base64UrlDecode(signatureB64)

    // Convert PEM to binary
    const pemHeader = '-----BEGIN PUBLIC KEY-----'
    const pemFooter = '-----END PUBLIC KEY-----'
    const pemContents = publicKey
      .replace(pemHeader, '')
      .replace(pemFooter, '')
      .replace(/\s/g, '')

    // Decode base64 (not base64url) for PEM content
    const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0))

    // Import the public key (updated to use binary key)
    const key = await crypto.subtle.importKey(
      'spki',
      binaryKey,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['verify'],
    )

    // Verify the signature
    const isValid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      signatureProvided,
      data,
    )

    if (!isValid) {
      throw new Error('Invalid signature')
    }

    // Decode and parse the payload
    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(payloadB64)),
    )

    // Check if token is expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new Error('Token expired')
    }

    return {
      valid: true,
      payload,
    }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function middleware(request: NextRequest) {
  try {
    console.log('Middleware running for path:', request.nextUrl.pathname)

    const authHeader = request.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing authentication token' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const publicKey = process.env.DYNAMIC_PUBLIC_KEY
    if (!publicKey) {
      throw new Error('PUBLIC_KEY is not configured')
    }

    const { valid, error, payload } = await verifyJWT(token, publicKey)

    if (!valid) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid token', details: error }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Token is valid, proceed with the request
    const response = NextResponse.next()

    // Add custom headers
    response.headers.set('x-middleware-cache', 'no-cache')
    response.headers.set('x-middleware-executed', 'true')

    // Add user info from token to headers
    if (payload.sub) {
      console.log('payload', payload)
      response.headers.set('x-user-id', payload.sub)
      // TODO - update to latest used wallet and/or primary wallet
      // getDynamicCredentials()
      response.headers.set(
        'x-user-wallet',
        payload.verified_credentials[0]?.address.toLowerCase(),
      )
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Middleware error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}

export const config = {
  matcher: [
    '/api/users/:id*',
  ],
}
