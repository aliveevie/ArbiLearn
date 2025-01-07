'use client'

import { useActiveAccount } from "thirdweb/react"
import { ConnectThirdWebWallet } from "@/thirdweb/thirdwebwallet"

interface WalletGateProps {
  children: React.ReactNode
}

export function WalletGate({ children }: WalletGateProps) {
  const account = useActiveAccount()

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 text-center bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-white">Welcome to Web3 Learning</h1>
          <p className="text-purple-200">Connect your wallet to access your learning dashboard and earn rewards</p>
          <div className="p-4 bg-purple-800/30 rounded-lg backdrop-blur-sm">
            <ConnectThirdWebWallet />
          </div>
        </div>
      </div>
    )
  }

  return children
}

