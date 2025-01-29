import { UserProfile } from '@dynamic-labs/types'

export function getDynamicCredentials(user: UserProfile) {
  const emailCredentials = user.verifiedCredentials
    .filter((cred) => cred.format === 'email')
    .map((cred) => cred.email)

  const embeddedWallets = user.verifiedCredentials
    .filter((cred) => cred.walletProvider === 'embeddedWallet')
    .map((cred) => cred.address)

  const externalWallets = user.verifiedCredentials
    .filter(
      (cred) =>
        cred.chain === 'eip155' && cred.walletProvider !== 'embeddedWallet',
    )
    .map((cred) => cred.address)

  console.log('Verified emails:', emailCredentials)
  console.log('Embedded wallets:', embeddedWallets)
  console.log('External wallets:', externalWallets)

  if (!emailCredentials[0] || !embeddedWallets[0] || !externalWallets[0]) {
    console.error('Missing credentials, please check Dynamic/onchainProvider')
    return {
      email: '',
      appWallet: '',
      extWallet: '',
    }
  }

  return {
    email: emailCredentials[0],
    appWallet: embeddedWallets[0],
    extWallet: externalWallets[0],
  }
}
