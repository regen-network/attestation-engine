"use client"

import { useState, useEffect } from "react"
import { useNetwork } from "../config/NetworkContext"
import { TextField } from "./TextField"
import { Button } from "./Button"
import { searchIRI } from "../lib/iriUtils"
import { queryAttestationsByIRI, attestIRI } from "../lib/regenUtils"
import { AttestationsByIRI } from "./AttestationsByIRI"

export function AttestIRI() {
  const { selectedChain } = useNetwork()
  const [iri, setIri] = useState<string>("")
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [clientReady, setClientReady] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [iriData, setIriData] = useState<any>(null)
  const [iriSource, setIriSource] = useState<string | null>(null)
  const [attestations, setAttestations] = useState<any[]>([])

  useEffect(() => {
    setClientReady(true)
  }, [])

  useEffect(() => {
    setIriData(null)
    setIriSource(null)
    setAttestations([])
    setMessage(null)
  }, []) // Only depend on iri

  const handleSearch = async () => {
    if (!iri) {
      setMessage("Please enter an IRI.")
      return
    }

    setSearchLoading(true)
    setMessage(null)
    setIriData(null)
    setIriSource(null)
    setAttestations([])

    try {
      const result = await searchIRI(iri, selectedChain)
      setIriData(result.content)
      setIriSource(result.source)
      const attestationsData = await queryAttestationsByIRI(iri, selectedChain.rpc)
      setAttestations(attestationsData)

      if (Object.keys(result.content).length === 0 && attestationsData.length === 0) {
        setMessage("This IRI does not exist on-chain.")
      }
    } catch (error: any) {
      setMessage(`Search failed: ${error.message}`)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleAttest = async () => {
    if (!iri) {
      setMessage("Please enter an IRI.")
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // Use the current selectedChain here
      const result = await attestIRI(iri, selectedChain)
      setMessage(result)
      // Refresh attestations after successful attestation
      const attestationsData = await queryAttestationsByIRI(iri, selectedChain.rpc)
      setAttestations(attestationsData)
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!clientReady) {
    return null
  }

  return (
    <div className="w-full bg-grey-100 pt-16 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-grey-600 text-2xl font-semibold mb-2">Search for an IRI</h2>
        <p className="text-grey-400 text-sm mb-6">Enter an IRI to search or attest on the Regen Network</p>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col gap-4">
            <TextField
              placeholder="Enter IRI (e.g., regen:13toVhNoAXFbxEMLiQWrdLQiLCM2H9ZfwEtyiADshnHr4yLw6wFLmDC.rdf)"
              className="w-full text-base py-3"
              value={iri}
              onChange={(e) => setIri(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
            />
            <div className="flex gap-4">
              <Button
                onClick={handleSearch}
                disabled={searchLoading}
                className="flex-1 bg-bc-green-500 hover:bg-bc-green-600 text-white"
              >
                {searchLoading ? "Searching..." : "Search"}
              </Button>
              <Button onClick={handleAttest} disabled={loading} className="flex-1">
                {loading ? "Attesting..." : "Attest"}
              </Button>
            </div>
          </div>

          {message && (
            <div className="mt-4 p-4 bg-grey-100 border border-grey-200 rounded-md text-sm text-grey-600">
              {message}
            </div>
          )}
        </div>

        {iriData && Object.keys(iriData).length > 0 && (
          <div className="mt-8">
            <h3 className="text-grey-600 text-xl font-semibold mb-4">
              IRI Contents {iriSource && `(from ${iriSource} API)`}
            </h3>
            <div className="bg-white border border-grey-200 rounded-lg shadow-md p-6 overflow-auto max-h-[600px]">
              <pre className="text-sm text-grey-600 whitespace-pre-wrap">{JSON.stringify(iriData, null, 2)}</pre>
            </div>
          </div>
        )}

        <AttestationsByIRI attestations={attestations} />
      </div>
    </div>
  )
}