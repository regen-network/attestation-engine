"use client";

import { useState, useEffect } from "react";
import { useNetwork } from "../config/NetworkContext";

export function useWallet() {
  const { selectedChain } = useNetwork();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWallet() {
      const { keplr } = window as any;
      if (!keplr) return;

      try {
        await keplr.enable(selectedChain.chainId);
        const offlineSigner = keplr.getOfflineSigner(selectedChain.chainId);
        const accounts = await offlineSigner.getAccounts();
        setWalletAddress(accounts[0]?.address || "Not Connected");
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    }

    fetchWallet();
  }, [selectedChain]);

  return walletAddress;
}