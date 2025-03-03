"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { CHAINS, type Chain } from "./network"

interface NetworkContextType {
  selectedChain: Chain
  setSelectedChain: (chain: Chain) => void
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined)

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [selectedChain, setSelectedChain] = useState<Chain>(CHAINS[0])

  const changeSelectedChain = (chain: Chain) => {
    setSelectedChain(chain)
  }

  return (
    <NetworkContext.Provider value={{ selectedChain, setSelectedChain: changeSelectedChain }}>
      {children}
    </NetworkContext.Provider>
  )
}

export function useNetwork() {
  const context = useContext(NetworkContext)
  if (context === undefined) {
    throw new Error("useNetwork must be used within a NetworkProvider")
  }
  return context
}