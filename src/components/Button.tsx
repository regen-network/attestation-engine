import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "custom"
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const baseClasses =
    "px-6 py-3 rounded-md text-sm font-semibold tracking-wide transition-colors duration-200 ease-in-out"

  let variantClasses = ""
  if (variant === "primary") {
    variantClasses = "bg-[#4fb573] text-white hover:bg-[#45a367] focus:ring-2 focus:ring-[#7bc796] focus:outline-none"
  } else if (variant === "secondary") {
    variantClasses =
      "bg-white text-[#4fb573] border border-[#4fb573] hover:bg-[#f0f7f3] focus:ring-2 focus:ring-[#7bc796] focus:outline-none"
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}