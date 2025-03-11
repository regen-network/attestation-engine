"use client";

import { useWallet } from "../hooks/useWallet";

export function WalletAddress() {
  const walletAddress = useWallet();

  return (
    <div className="flex items-center border border-grey-200 rounded px-3 py-1.5 text-sm bg-grey-100">
      <span className="text-grey-500">
        {walletAddress
          ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)
          : "Not Connected"}
      </span>
    </div>
  );
}