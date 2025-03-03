"use client"

import { useState, useEffect } from "react"
import { useNetwork } from "../config/NetworkContext"

export function WalletAddress() {
  const { selectedChain } = useNetwork()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    const fetchWallet = async () => {
      const { keplr } = window as any
      if (!keplr) return

      try {
        await keplr.enable(selectedChain.chainId)
        const offlineSigner = keplr.getOfflineSigner(selectedChain.chainId)
        const accounts = await offlineSigner.getAccounts()
        setWalletAddress(accounts[0]?.address || "Not Connected")
      } catch (error) {
        console.error("Error fetching wallet:", error)
      }
    }

    fetchWallet()
  }, [selectedChain])

  return (
    <div className="flex items-center border border-grey-200 rounded px-3 py-1.5 text-sm bg-grey-100">
      <span className="text-grey-500">
        {walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "Not Connected"}
      </span>
    </div>
  )
}