import type { AuthUser } from '@/generated/prisma/client'

import type { ProfileAuth } from '@/contracts/profile'
import { prisma } from '@/lib/prisma'

export const getProfileQuery = async (
  user: AuthUser
): Promise<ProfileAuth | null> => {
  const profile = await prisma.profile.findFirst({
    select: {
      id: true,
      name: true,
      typeUser: true,
      preferences: true,
    },
    where: {
      userId: user.id,
    },
  })

  if (!profile) {
    return null
  }

  const userMetadata = user.raw_user_meta_data as {
    avatar_url?: string
  }

  return {
    id: profile.id,
    name: profile.name,
    email: user.email!,
    image: userMetadata.avatar_url,
    role: profile.typeUser,
    preferences: profile.preferences,
  }
}
