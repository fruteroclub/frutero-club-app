import { User } from '@prisma/client'
import prisma from '@/server/prismaClient'
import type { UserWithRelations } from '@/types/db'

export type GetOrCreateUserDTO = {
  id: string
  appWallet: string
  email: string
  extWallet?: string
  username: string
}

export class AuthService {
  private cache: Map<string, User> = new Map()

  constructor() {
    // Repository injection would go here if using a separate repository layer
  }

  async getOrCreateUser(data: GetOrCreateUserDTO): Promise<User | null> {
    const { id, appWallet, email, extWallet, username } = data
    try {
      // Check cache first
      const cachedUser = this.cache.get(id)
      if (cachedUser) return cachedUser

      let user = await prisma.user.findFirst({
        where: {
          id,
        },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            id,
            appWallet,
            displayName: username,
            email,
            extWallet,
            username,
          },
        })
      }

      // Cache the user
      if (user) this.cache.set(id, user)
      return user
    } catch (error) {
      console.error('Error in getOrCreateUser:', error)
      return null
    }
  }

  async getCurrentUser(userId: string): Promise<UserWithRelations | null> {
    // Get the user ID from your auth system
    // const userId = ...

    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        communities: {
          include: {
            community: true,
          },
        },
        projects: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
    })
  }
}
