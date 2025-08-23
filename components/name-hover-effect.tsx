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
  const allImages = [
    "/images/ok.png",
    "/images/1.png",
    "/images/11.png",
    "/images/111.png",
    "/images/1111.png",
    // "/images/11111.png", 
    // "/images/profile.png",
  ]

  // Initialize component (no need to track available images anymore)
  useEffect(() => {
    // Component is ready
  }, [])

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

    // Pick a random image from all images (allowing repeats for most images)
    const randomIndex = Math.floor(Math.random() * allImages.length)
    const selectedImage = allImages[randomIndex]

    setCurrentImageIndex(randomIndex)

    // Only track 6.png in localStorage - other images can repeat freely
    if (selectedImage === "/images/6.png") {
      try {
        const shownImages = JSON.parse(localStorage.getItem('shownImages') || '[]')

        // If 6.png has already been shown, pick a different image
        if (shownImages.includes("/images/6.png")) {
          // Find another random image that's not 6.png
          const otherImages = allImages.filter(img => img !== "/images/6.png")
          const newRandomIndex = Math.floor(Math.random() * otherImages.length)
          const newSelectedImage = otherImages[newRandomIndex]
          const newOriginalIndex = allImages.indexOf(newSelectedImage)

          setCurrentImageIndex(newOriginalIndex)
          return
        }

        // Mark 6.png as shown
        const updatedShownImages = [...shownImages, "/images/6.png"]
        localStorage.setItem('shownImages', JSON.stringify(updatedShownImages))
      } catch (error) {
        console.error('Failed to update localStorage:', error)
      }
    }
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
                  src={allImages[currentImageIndex] || "/placeholder.svg"}
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