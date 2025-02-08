'use client'

import { Section } from '@/components/layout/section'
import { ProfileHeader } from '@/components/profile/profile-header'
import { ProfileDetails } from '@/components/profile/profile-details'
import { ProfileSocial } from '@/components/profile/profile-social'
import { useUser } from '@/hooks/users'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Skeleton } from '@/components/ui/skeleton'

export default function Cuenta() {
  const { user: dynamicUser, sdkHasLoaded } = useDynamicContext()
  const { data: user, error, status } = useUser(dynamicUser?.userId ?? '')

  console.log("user", user)

  if (status === 'pending' || !sdkHasLoaded) {
    return (
      <Section>
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Section>
    )
  }

  if (error || !user) {
    return (
      <Section>
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold">Error cargando el perfil</h1>
          <p className="text-muted-foreground">
            Por favor, inténtalo más tarde
          </p>
        </div>
      </Section>
    )
  }

  return (
    <Section className="space-y-6">
      <ProfileHeader user={user} />
      <ProfileDetails user={user} />
      <ProfileSocial user={user} />
    </Section>
  )
}
