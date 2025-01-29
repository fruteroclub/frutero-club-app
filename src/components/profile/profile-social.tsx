'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { UserWithRelations } from '@/types/db'
import { Github, Twitter } from 'lucide-react'

interface ProfileSocialProps {
  user: UserWithRelations
}

export function ProfileSocial({ user }: ProfileSocialProps) {
  // We need to get the profile data to show social links
  const profile = user.profile

  if (!profile) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.githubUsername && (
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4 text-muted-foreground" />
            <a
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {profile.githubUsername}
            </a>
          </div>
        )}

        {profile.xUsername && (
          <div className="flex items-center gap-2">
            <Twitter className="h-4 w-4 text-muted-foreground" />
            <a
              href={`https://twitter.com/${profile.xUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {profile.xUsername}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
