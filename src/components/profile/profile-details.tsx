'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { UserWithProfile } from '@/types/db'
import { truncateAddress } from '@/utils/wallet'
import { Globe, Mail, Wallet } from 'lucide-react'
import { Address } from 'viem'

interface ProfileDetailsProps {
  user: UserWithProfile
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Cuenta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <span>{user.email}</span>
          </div>
        )}

        {user.website && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {user.website}
            </a>
          </div>
        )}

        <div className="flex flex-col justify-center gap-2">
          <p>Carteras:</p>
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span>
              App: {truncateAddress({ address: user.appWallet as Address })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span>
              Externa: {truncateAddress({ address: user.extWallet as Address })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
