"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface NameHoverEffectProps {
  children: React.ReactNode
}

export default function NameHoverEffect({ children }: NameHoverEffectProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const nameRef = useRef<HTMLSpanElement>(null)

  // Array of images that will cycle through
  const images = [
    "/placeholder.svg?height=200&width=200&text=Photo1",
    "/placeholder.svg?height=200&width=200&text=Photo2",
    "/placeholder.svg?height=200&width=200&text=Photo3",
    "/placeholder.svg?height=200&width=200&text=Photo4",
    "/placeholder.svg?height=200&width=200&text=Photo5",
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (nameRef.current && isHovered) {
        const rect = nameRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    if (isHovered && nameRef.current) {
      nameRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (nameRef.current) {
        nameRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
    // Pick a random image index different from the current one
    let nextIndex = currentImageIndex
    while (nextIndex === currentImageIndex && images.length > 1) {
      nextIndex = Math.floor(Math.random() * images.length)
    }
    setCurrentImageIndex(nextIndex)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <span
      ref={nameRef}
      className="relative cursor-pointer inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute pointer-events-none z-50"
            style={{
              left: mousePosition.x,
              top: mousePosition.y - 120, // Position above the cursor
              transform: "translateX(-50%)", // Center horizontally
            }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`Dipak Photo ${currentImageIndex + 1}`}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </span>
  )
}