import type React from "react"

interface SkeletonLoaderProps {
  className?: string
  count?: number
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = "", count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`skeleton ${className}`} />
      ))}
    </>
  )
}

export default SkeletonLoader
