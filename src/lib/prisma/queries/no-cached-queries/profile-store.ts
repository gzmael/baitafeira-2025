import type { FindProfileStoresList } from '@/contracts/profile-store'
import { prisma } from '@/lib/prisma'

export const getProfilesStoreQuery = async (
  {
    limit,
    offset,
    column = 'createdAt',
    fromDay,
    order = 'desc',
    search,
    toDay,
  }: FindProfileStoresList,
  storeId: string
) => {
  const dayFilter =
    fromDay && toDay
      ? {
          gte: fromDay,
          lte: toDay,
        }
      : undefined

  const orderFilter =
    column && order
      ? {
          [column]: order,
        }
      : undefined

  const profileStores = await prisma.profileStore.findMany({
    where: {
      storeId,
      name: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const users = await prisma.authUser.findMany({
    where: {
      id: {
        in: profileStores.map((profile) => profile.userId),
      },
    },
  })

  const profileStoresWithUsers = profileStores.map((profile) => {
    const user = users.find((user) => user.id === profile.userId)
    return { ...profile, user }
  })

  const count = await prisma.profileStore.count({
    where: {
      storeId,
      name: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
  })

  return { profileStores: profileStoresWithUsers, count }
}
