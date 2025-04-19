import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { eduChainTestnet } from '@reown/appkit/networks'
// import { Chain } from 'wagmi'

// Load env
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Define your custom network
export const pharosDevnet = {
  id: 50002,
  name: 'Pharos Devnet',
  network: 'pharos-devnet',
  nativeCurrency: {
    name: 'PTT',
    symbol: 'PTT',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://devnet.dplabs-internal.com/'],
    },
    public: {
      http: ['https://devnet.dplabs-internal.com/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Pharos Explorer',
      url: 'https://pharosscan.xyz',
    },
  },
}

// Use either eduChainTestnet or your custom chain
export const network = pharosDevnet // or [eduChainTestnet, pharosDevnet] if you want both

// Set up Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  networks: [network],
  projectId,
})

// Export Wagmi config
export const config = wagmiAdapter.wagmiConfig
