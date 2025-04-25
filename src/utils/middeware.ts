import { ZodError } from 'zod'
import { type NextRequest, NextResponse } from 'next/server'
import { captureException, checkCommonErrors, SafeError } from '@/utils/error'
import { env } from '@/env'
import { logErrorToPosthog } from '@/utils/error.server'
import { createScopedLogger } from '@/utils/logger'

const logger = createScopedLogger('middleware')

export type NextHandler = (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> },
) => Promise<Response>

export function withError(handler: NextHandler): NextHandler {
  return async (req, context) => {
    try {
      return await handler(req, context)
    } catch (error) {
      if (error instanceof ZodError) {
        if (env.LOG_ZOD_ERRORS) {
          logger.error('Error for url', { error, url: req.url })
        }
        return NextResponse.json(
          { error: { issues: error.issues }, isKnownError: true },
          { status: 400 },
        )
      }

      const apiError = checkCommonErrors(error, req.url)
      if (apiError) {
        await logErrorToPosthog('api', req.url, apiError.type)

        return NextResponse.json(
          { error: apiError.message, isKnownError: true },
          { status: apiError.code },
        )
      }

      if (error instanceof SafeError) {
        return NextResponse.json(
          { error: error.safeMessage, isKnownError: true },
          { status: 400 },
        )
      }

      // Quick fix: log full error in development. TODO: handle properly
      if (env.NODE_ENV === 'development') {
        console.error(error)
      }

      logger.error('Unhandled error', {
        error,
        url: req.url,
        email: await getEmailFromRequest(),
      })

      captureException(error, { extra: { url: req.url } })

      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 },
      )
    }
  }
}
