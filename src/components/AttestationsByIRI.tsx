import { CheckCircle2 } from "lucide-react"

interface Attestation {
  attestor: string
  timestamp: string
}

interface AttestationsByIRIProps {
  attestations: Attestation[]
}

export function AttestationsByIRI({ attestations }: AttestationsByIRIProps) {
  if (attestations.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-grey-600 text-xl font-semibold mb-4">Attestation History</h3>
      <div className="bg-white border border-grey-200 rounded-lg shadow-md p-6">
        {attestations.map((attestation, index) => (
          <div key={index} className="flex items-center mb-4 last:mb-0">
            <CheckCircle2 className="text-bc-green-500 mr-2" />
            <div>
              <p className="text-sm text-grey-600">Verified by {attestation.attestor}</p>
              <p className="text-xs text-grey-400">{new Date(attestation.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}