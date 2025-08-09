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
  const bgColor = !mounted ? "bg-black" : resolvedTheme === "dark" ? "bg-black" : "bg-white"
  const borderColor = !mounted ? "border-gray-800" : resolvedTheme === "dark" ? "border-gray-800" : "border-gray-200"

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`w-full ${bgColor} text-black px-4 md:px-8 py-2 flex justify-between items-center border-b ${borderColor}`}
    >
      {/* Profile Picture */}
      <div className="font-medium text-sm md:text-base">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
            <Image
              src="../images/profilee.jpg"
              alt="Profile"
              width={38}
              height={20}
              className="object-cover h-full"
              
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
                activeSection === "work" ? "text-black" : "text-black-600 hover:text-blue"
              }`}
            >
              <span className="font-medium mr-1"></span> Projects
            </button>
            <button
              onClick={() => handleTabClick("about", onAboutClick)}
              className={`text-xs font-light transition-all ${
                activeSection === "about" ? "text-black" : "text-black-600 hover:text-blue"
              }`}
            >
              <span className="font-medium mr-1"></span> About
            </button>
            <button
              onClick={() => handleTabClick("connect", onContactClick)}
              className={`text-xs font-light transition-all ${
                activeSection === "connect" ? "text-black" : "text-black-600 hover:text-blue"
              }`}
            >
              <span className="font-medium mr-1"></span> Contact
            </button>
          </div>

          {/* Theme Toggle - Desktop only */}
          
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="flex items-center space-x-4">
          {/* Theme Toggle for Mobile only */}
         

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center z-50"
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
          className={`absolute top-16 right-4 left-4 ${bgColor} border ${borderColor} rounded-md shadow-lg p-4 z-40`}
        >
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleTabClick("work", onWorkClick)}
              className={`text-left text-xs ${activeSection === "work" ? "text-black" : "text-black-600"}`}
            >
              <span className="font-medium mr-1"></span> Projects
            </button>
            <button
              onClick={() => handleTabClick("about", onAboutClick)}
              className={`text-left text-xs ${activeSection === "about" ? "text-black" : "text-black-600"}`}
            >
              <span className="font-medium mr-1"></span> About
            </button>
            <button
              onClick={() => handleTabClick("connect", onContactClick)}
              className={`text-left text-xs ${activeSection === "connect" ? "text-black" : "text-black-600"}`}
            >
              <span className="font-medium mr-1"></span> Contact
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
