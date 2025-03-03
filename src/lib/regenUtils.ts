import { regen, getSigningRegenClient } from "@regen-network/api"
import type { Chain } from "../config/network"

export async function queryAttestationsByIRI(iri: string, rpcEndpoint: string): Promise<any> {

  const queryClient = await regen.ClientFactory.createRPCQueryClient({ rpcEndpoint });

  const attestors = await queryClient.regen.data.v1.attestationsByIRI({ iri: iri.trim() });

  if(!attestors?.attestations) {
    throw new Error("Attestors not returned from attestations by iri");
  }

  return attestors.attestations;
}

export async function convertIRIToHash(iri: string, rpcEndpoint: string): Promise<any> {

  const queryClient = await regen.ClientFactory.createRPCQueryClient({ rpcEndpoint });

  const iriToHashResponse = await queryClient.regen.data.v1.convertIRIToHash({ iri: iri.trim() });

  if (!iriToHashResponse?.contentHash?.graph) {
    throw new Error("No valid hash returned from ConvertIRIToHash.");
  }

  return iriToHashResponse.contentHash.graph;
}

export async function createMsgAttest(attestor: string, contentHashGraph: any): Promise<any> {
  return regen.data.v1.MessageComposer.withTypeUrl.attest({
    attestor,
    contentHashes: [contentHashGraph],
  });
}

export async function signAndBroadcast(signingClient: any, account: any, msg: any): Promise<any> {
  const fee = {
    amount: [{ denom: "uregen", amount: "5000" }],
    gas: "100000",
  };

  return await signingClient.signAndBroadcast(account.address, [msg], fee);
}

export { getSigningRegenClient };

export async function attestIRI(iri: string, selectedChain: Chain): Promise<string> {
  try {
    const { getSigningRegenClient } = await import("@regen-network/api")
    const { convertIRIToHash, createMsgAttest, signAndBroadcast } = await import("./regenUtils")

    const { keplr } = window as any
    if (!keplr) {
      throw new Error("Keplr wallet not found.")
    }

    await keplr.enable(selectedChain.chainId)
    const offlineSigner = keplr.getOfflineSigner(selectedChain.chainId)
    const [account] = await offlineSigner.getAccounts()
    const signingClient = await getSigningRegenClient({ rpcEndpoint: selectedChain.rpc, signer: offlineSigner })

    // Convert IRI to hash
    const contentHashGraph = await convertIRIToHash(iri, selectedChain.rpc)

    // Create the MsgAttest transaction
    const msg = await createMsgAttest(account.address, contentHashGraph)

    // Sign and broadcast
    const response = await signAndBroadcast(signingClient, account, msg)

    if (response.code === 0) {
      return "Attestation successful!"
    } else {
      throw new Error(`Error: ${response.rawLog}`)
    }
  } catch (error: any) {
    throw new Error(`Transaction failed: ${error.message}`)
  }
}

