import * as React from "react"

interface VisuallyHiddenProps {
  children: React.ReactNode
}

const VisuallyHidden = ({ children }: VisuallyHiddenProps) => (
  <span className="sr-only">
    {children}
  </span>
)

export { VisuallyHidden } 