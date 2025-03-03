"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import registryLogo from "../../public/registry-logo.png";
import { useNetwork } from "../config/NetworkContext";
import { WalletAddress } from "./WalletAddress";
import { NetworkSelector } from "./NetworkSelector";


export function Header() {
  const { selectedChain, setSelectedChain } = useNetwork()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [networkStatus, setNetworkStatus] = useState<"loading" | "success" | "error">("loading")

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
        return `${baseClasses} border-brand-400 bg-brand-100`
      case "error":
        return `${baseClasses} border-error-400 bg-error-100`
      default:
        return `${baseClasses} border-grey-300`
    }
  }


  return (
    <header className="bg-grey-0 border-b border-grey-200 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]">
      <div className="w-full px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center w-[200px]">
          <Image src={registryLogo} alt="Regen Registry" width={100} height={40} className="mr-2" />
        </div>

        {/* Title */}
        <h1 className="text-grey-600 text-2xl font-bold flex-1 text-center">Regen Attestation Engine</h1>

        {/* Network Selector and Wallet Address */}
        <div className="flex gap-3 w-[200px] justify-end">
          <NetworkSelector />
          <WalletAddress />
        </div>
      </div>
    </header>
  )
}