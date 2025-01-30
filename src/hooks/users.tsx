import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/server/apiClient'
import { User } from '@prisma/client'
import type { UserWithRelations, UserUpdateInput } from '@/types/db'
import { getAuthToken } from '@dynamic-labs/sdk-react-core'

// User hooks
export function useUsers(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => apiClient.users.getAll(params),
  })
}

async function updateUser(
  id: string,
  data: UserUpdateInput,
): Promise<UserWithRelations> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update user')
  return response.json()
}

async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete user')
}

export function useUser(id: string) {
  const authToken = getAuthToken()
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const user = await apiClient.users.getById(id, authToken)
      return user.data
    },
    enabled: Boolean(id),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<User, 'createdAt' | 'updatedAt'>) =>
      apiClient.users.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserUpdateInput) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] })
    },
  })
}

export function useDeleteUser(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] })
    },
  })
}
