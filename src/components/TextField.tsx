import type React from "react"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function TextField({ label, className, ...props }: TextFieldProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-semibold text-grey-600">{label}</label>}
      <input
        className={`flex-1 border border-grey-300 rounded-md px-4 py-2 text-grey-600 bg-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent ${className}`}
        {...props}
      />
    </div>
  )
}