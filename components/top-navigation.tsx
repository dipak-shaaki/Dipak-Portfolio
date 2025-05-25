"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, Sun, Moon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

interface TopNavigationProps {
  onWorkClick: () => void
  onAboutClick: () => void
  onContactClick: () => void
  activeSection: string
}

export default function TopNavigation({
  onWorkClick,
  onAboutClick,
  onContactClick,
  activeSection,
}: TopNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleTabClick = (tab: string, action: () => void) => {
    action()
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  // Determine text color based on theme
  const textColor = !mounted ? "text-white" : resolvedTheme === "dark" ? "text-white" : "text-black"
  const bgColor = !mounted ? "bg-black" : resolvedTheme === "dark" ? "bg-black" : "bg-white"
  const borderColor = !mounted ? "border-gray-800" : resolvedTheme === "dark" ? "border-gray-800" : "border-gray-200"
  const inactiveTextColor = !mounted ? "text-gray-400" : resolvedTheme === "dark" ? "text-gray-400" : "text-gray-600"

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`w-full ${bgColor} ${textColor} px-4 md:px-8 py-4 flex justify-between items-center border-b ${borderColor}`}
    >
      {/* Profile Picture */}
      <div className="font-medium text-sm md:text-base">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </Link>
      </div>

      {/* Desktop Navigation with Theme Toggle */}
      {!isMobile && (
        <div className="flex items-center">
          <div className="flex items-center space-x-16 mr-8">
            <button
              onClick={() => handleTabClick("work", onWorkClick)}
              className={`text-xs font-light transition-all ${
                activeSection === "work" ? textColor : `${inactiveTextColor} hover:${textColor}`
              }`}
            >
              <span className="font-medium mr-1"></span> Work
            </button>
            <button
              onClick={() => handleTabClick("about", onAboutClick)}
              className={`text-xs font-light transition-all ${
                activeSection === "about" ? textColor : `${inactiveTextColor} hover:${textColor}`
              }`}
            >
              <span className="font-medium mr-1"></span> About
            </button>
            <button
              onClick={() => handleTabClick("connect", onContactClick)}
              className={`text-xs font-light transition-all ${
                activeSection === "connect" ? textColor : `${inactiveTextColor} hover:${textColor}`
              }`}
            >
              <span className="font-medium mr-1"></span> Contact
            </button>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="flex items-center space-x-4">
          {/* Theme Toggle for Mobile */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      )}

      {isMobile && isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute top-16 right-4 left-4 ${bgColor} border ${borderColor} rounded-md shadow-lg p-4 z-50`}
        >
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleTabClick("work", onWorkClick)}
              className={`text-left text-xs ${activeSection === "work" ? textColor : inactiveTextColor}`}
            >
              <span className="font-medium mr-1"></span> Work
            </button>
            <button
              onClick={() => handleTabClick("about", onAboutClick)}
              className={`text-left text-xs ${activeSection === "about" ? textColor : inactiveTextColor}`}
            >
              <span className="font-medium mr-1"></span> About
            </button>
            <button
              onClick={() => handleTabClick("connect", onContactClick)}
              className={`text-left text-xs ${activeSection === "connect" ? textColor : inactiveTextColor}`}
            >
              <span className="font-medium mr-1"></span> Contact
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
