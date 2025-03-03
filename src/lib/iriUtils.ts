import type { Chain } from "../config/network"

async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export async function searchIRI(iri: string, selectedChain: Chain): Promise<any> {
  // Try the data API endpoint first
  try {
    const response = await fetchWithTimeout(`${selectedChain.metadataApiEndpoint}${encodeURIComponent(iri)}`)
    if (response.ok) {
      const data = await response.json()
      if (Object.keys(data).length > 0) {
        return { source: "data", content: data }
      }
    }
  } catch (error) {
    console.error("Error fetching from data API:", error)
  }
}
