'use client'

import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  DynamicContextProvider,
  DynamicEventsCallbacks,
} from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { createConfig, WagmiProvider } from 'wagmi'
import { Address, http } from 'viem'
import {
  arbitrum,
  base,
  gnosis,
  mainnet,
  optimism,
  polygon,
  polygonAmoy,
  scroll,
  sepolia,
} from 'viem/chains'
import { walletConnect } from 'wagmi/connectors'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/server/apiClient'
import { getDynamicCredentials } from '@/utils/dynamic'

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? ''
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''

const config = createConfig({
  chains: [
    arbitrum,
    base,
    gnosis,
    mainnet,
    optimism,
    polygon,
    polygonAmoy,
    scroll,
    sepolia,
  ],
  connectors: [
    walletConnect({
      projectId: walletConnectProjectId,
    }),
  ],
  multiInjectedProviderDiscovery: false,
  transports: {
    [arbitrum.id]: http(
      `https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
    ),
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
    [gnosis.id]: http(
      `https://gnosis-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
    ),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
    [optimism.id]: http(
      `https://opt-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
    ),
    [polygon.id]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
    ),
    [polygonAmoy.id]: http(
      `https://polygon-amoy.g.alchemy.com/v2/${alchemyApiKey}`,
    ),
    [scroll.id]: http(
      `https://scroll-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
    ),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
  },
})

const queryClient = new QueryClient()

export default function OnchainProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const events: DynamicEventsCallbacks = {
    onAuthSuccess: async ({ primaryWallet, user }) => {
      const { email, appWallet, extWallet } = getDynamicCredentials(user)
      console.log('credentials', { email, appWallet, extWallet })

      if (
        !primaryWallet ||
        !user ||
        !user.userId ||
        !user.username ||
        !email ||
        !appWallet ||
        !extWallet
      ) {
        console.error(
          'Missing args from onAuthSuccess event, please check Dynamic/onchainProvider',
        )
        return
      }
      try {
        const fetchedUser = await apiClient.auth.getOrCreateUser({
          dynamicUserId: user.userId,
          appWallet: appWallet as Address,
          extWallet: extWallet as Address,
          email: email as string,
          username: user.username,
        })
        console.log('Succesfully fetched user:', fetchedUser)
        router.push('/cuenta')
      } catch (error) {
        console.error(error)
        console.error('Unable to read/create user, please check the server')
      }
    },
    onLogout: (args) => {
      console.log('onLogout was called', args)
      router.push('/')
    },
  }

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID ?? 'ENV_ID',
        events,
        // TODO: Uncomment this when we have a custom network
        // overrides: {
        //   evmNetworks: (networks) => mergeNetworks(customEvmNetworks, networks),
        // },
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}
