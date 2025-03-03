export function RegenLogo() {
  return (
    <div className="flex items-center">
      <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.5 8C19.5 12.1421 16.1421 15.5 12 15.5C7.85786 15.5 4.5 12.1421 4.5 8C4.5 3.85786 7.85786 0.5 12 0.5C16.1421 0.5 19.5 3.85786 19.5 8Z"
          fill="black"
        />
        <path d="M48.5 10L44 5L39.5 10L44 15L48.5 10Z" fill="black" />
        <path d="M34.5 5L30 0L25.5 5L30 10L34.5 5Z" fill="black" />
        <path d="M34.5 15L30 10L25.5 15L30 20L34.5 15Z" fill="black" />
      </svg>
      <div className="ml-2">
        <div className="font-bold text-black text-sm">REGEN</div>
        <div className="text-black text-xs">MARKET</div>
      </div>
    </div>
  )
}

