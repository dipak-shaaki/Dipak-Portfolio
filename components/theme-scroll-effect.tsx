"use client"

import { useEffect, useState } from "react"

export default function ThemeScrollEffect({ children }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 15% chance to toggle theme on scroll
      if (Math.random() < 0.15) {
        setIsDark(prev => !prev)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`transition-colors duration-700 min-h-screen`}
      style={{
        backgroundColor: isDark ? "#18181b" : "#fff",
        color: isDark ? "#fff" : "#18181b",
      }}
    >
      {children}
    </div>
  )
}