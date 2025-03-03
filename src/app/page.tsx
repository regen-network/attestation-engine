import { NetworkProvider } from "../config/NetworkContext"
import { Header } from "../components/Header"
import { AttestIRI } from "../components/AttestIRI"

export default function Home() {
  return (
    <NetworkProvider>
      <div className="min-h-screen bg-grey-100 flex flex-col w-full">
        <Header />
        <main className="flex-grow">
          <AttestIRI />
        </main>
      </div>
    </NetworkProvider>
  )
}