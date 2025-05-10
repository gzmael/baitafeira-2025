import * as Sentry from '@sentry/nextjs'
import { NextResponse, type NextRequest } from 'next/server'

import { updateSession } from '@/lib/supabase/middleware'

import { env } from './env'

export async function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: env.NEXT_PUBLIC_SENTRY_DSN,
      // Add any other Sentry configuration options here
    })
  }

  try {
    return await updateSession(request)
  } catch (error) {
    if (env.NODE_ENV === 'production') {
      Sentry.captureException(error)
    }
    console.error('Middleware error:', error)
    return NextResponse.error()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
