"use client"

import { useState, useEffect } from "react"
import { useNetwork } from "../config/NetworkContext"
import { CHAINS } from "../config/network"
import { ChevronDown } from 'lucide-react'

export function NetworkSelector() {
  const { selectedChain, setSelectedChain } = useNetwork()
  const [networkStatus, setNetworkStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    const checkNetworkStatus = async () => {
      setNetworkStatus("loading")
      try {
        const response = await fetch(selectedChain.rpc)
        if (response.ok) {
          setNetworkStatus("success")
        } else {
          setNetworkStatus("error")
        }
      } catch (error) {
        console.error("Error checking network status:", error)
        setNetworkStatus("error")
      }
    }

    checkNetworkStatus()
  }, [selectedChain])

  const getNetworkSelectorClasses = () => {
    const baseClasses =
      "appearance-none flex items-center gap-1 border rounded px-3 py-1.5 text-sm pr-8 bg-white transition-colors duration-300"
    switch (networkStatus) {
      case "success":
        return `${baseClasses} border-bc-green-500 bg-bc-green-100`
      case "error":
        return `${baseClasses} border-red-500 bg-red-100`
      default:
        return `${baseClasses} border-grey-300`
    }
  }

  return (
    <div className="relative">
      <select
        value={selectedChain.rpc}
        onChange={(e) => {
          const newChain = CHAINS.find((c) => c.rpc === e.target.value)
          if (newChain) setSelectedChain(newChain)
        }}
        className={getNetworkSelectorClasses()}
      >
        {CHAINS.map((chain) => (
          <option key={chain.rpc} value={chain.rpc}>
            {chain.name}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-grey-500"
      />
      {networkStatus === "loading" && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-grey-200 overflow-hidden">
          <div className="h-full bg-bc-green-500 animate-loading-bar"></div>
        </div>
      )}
    </div>
  )
}