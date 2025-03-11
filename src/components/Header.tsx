"use client";

import Image from "next/image";
import registryLogo from "../../public/registry-logo.png";
import { WalletAddress } from "./WalletAddress";
import { NetworkSelector } from "./NetworkSelector";

export function Header() {

  return (
    <header className="bg-grey-0 border-b border-grey-200 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]">
      <div className="w-full px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center w-[200px]">
          <Image
            src={registryLogo}
            alt="Regen Registry"
            width={100}
            height={40}
            className="mr-2"
          />
        </div>

        {/* Title */}
        <h1 className="text-grey-600 text-2xl font-bold flex-1 text-center">
          Regen Attestation Engine
        </h1>

        {/* Network Selector and Wallet Address */}
        <div className="flex gap-3 w-[200px] justify-end">
          <NetworkSelector />
          <WalletAddress />
        </div>
      </div>
    </header>
  );
}
