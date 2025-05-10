import type { StoreTypeUser, TypeUser } from '@/generated/prisma/client'
import * as Sentry from '@sentry/nextjs'
import { Ratelimit } from '@upstash/ratelimit'
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from 'next-safe-action'
import { headers } from 'next/headers'
import { z } from 'zod'

import type { ProfileAuth } from '@/contracts/profile'
import { setupAnalytics } from '@/lib/openpanel/server'
import { prisma } from '@/lib/prisma'
import {
  getProfile,
  getStoreProfile,
  getUser,
} from '@/lib/prisma/queries/cached-queries'
import { client as RedisClient } from '@/lib/redis'
import { createServerClient as createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/utils'

const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(10, '10s'),
  redis: RedisClient,
})

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})

export const actionClientWithMeta = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),
    })
  },
})

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: undefined })

    if (process.env.NODE_ENV === 'development') {
      logger('Input ->', clientInput)
      logger('Result ->', result.data)
      logger('Metadata ->', metadata)

      return result
    }

    return result
  })
  .use(async ({ next, metadata }) => {
    const ip = (await headers()).get('x-forwarded-for')

    const { success, remaining } = await ratelimit.limit(
      `${ip}-${metadata.name}`
    )

    if (!success) {
      throw new Error('Muitas requisições')
    }

    return next({
      ctx: {
        ratelimit: {
          remaining,
        },
      },
    })
  })
  .use(async ({ next, metadata }) => {
    const user = await getUser()
    const supabase = await createClient({ admin: true })
    let profile: ProfileAuth | null = null

    if (!user) {
      throw new Error('Não autorizado')
    }

    const metadataUser = user.raw_user_meta_data as {
      fullName?: string
      name?: string
      role: TypeUser | StoreTypeUser
    }

    const analytics = await setupAnalytics({
      userId: user.id,
      fullName: metadataUser.fullName ?? metadataUser.name ?? '-',
    })

    if (metadata?.track) {
      analytics.track(metadata.track)
    }

    if (['MANAGER', 'SELLER'].includes(metadataUser.role)) {
      const hasProfile = await getStoreProfile()

      if (!hasProfile) {
        throw new Error('Perfil da loja não encontrado')
      }

      profile = hasProfile
    } else {
      const hasProfile = await getProfile()

      if (!hasProfile) {
        throw new Error('Perfil de usuário não encontrado')
      }

      profile = hasProfile
    }

    return Sentry.withServerActionInstrumentation(metadata.name, async () => {
      return next({
        ctx: {
          supabase,
          analytics,
          user,
          prisma,
          profile,
        },
      })
    })
  })
