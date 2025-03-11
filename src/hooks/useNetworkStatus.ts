"use client";

import { useState, useEffect } from "react";

export function useNetworkStatus(rpc: string) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const checkNetworkStatus = async () => {
      setStatus("loading");
      try {
        const response = await fetch(rpc);
        setStatus(response.ok ? "success" : "error");
      } catch (error) {
        console.error("Error checking network status:", error);
        setStatus("error");
      }
    };

    checkNetworkStatus();
  }, [rpc]);

  return status;
}