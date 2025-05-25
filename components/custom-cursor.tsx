"use client"

import { useState, useEffect } from "react"
import { motion, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  // Use spring animation for smoother cursor movement with better settings
  const springConfig = { damping: 35, stiffness: 700, mass: 0.5 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })

      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [cursorX, cursorY])

  useEffect(() => {
    const projectElements = document.querySelectorAll(".project-card")
    const linkElements = document.querySelectorAll("a, button")

    const mouseEnterProject = () => setCursorVariant("project")
    const mouseEnterLink = () => setCursorVariant("link")
    const mouseLeaveElement = () => setCursorVariant("default")

    projectElements.forEach((element) => {
      element.addEventListener("mouseenter", mouseEnterProject)
      element.addEventListener("mouseleave", mouseLeaveElement)
    })

    linkElements.forEach((element) => {
      element.addEventListener("mouseenter", mouseEnterLink)
      element.addEventListener("mouseleave", mouseLeaveElement)
    })

    return () => {
      projectElements.forEach((element) => {
        element.removeEventListener("mouseenter", mouseEnterProject)
        element.removeEventListener("mouseleave", mouseLeaveElement)
      })

      linkElements.forEach((element) => {
        element.removeEventListener("mouseenter", mouseEnterLink)
        element.removeEventListener("mouseleave", mouseLeaveElement)
      })
    }
  }, [])

  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "difference",
    },
    project: {
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      mixBlendMode: "difference",
    },
    link: {
      height: 40,
      width: 40,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      border: "1px solid rgba(255, 255, 255, 1)",
      mixBlendMode: "difference",
    },
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
      `}</style>
    </>
  )
}
