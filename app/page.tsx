"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import CustomCursor from "@/components/custom-cursor"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Loader from "@/components/loader"
import Footer from "@/components/footer"
import TopNavigation from "@/components/top-navigation"
import WorkItem from "@/components/work-item"
import NameHoverEffect from "@/components/name-hover-effect"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("")

  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>, section: string) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
      setActiveSection(section)
    }
  }

  // Check which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      if (
        workRef.current &&
        scrollPosition >= workRef.current.offsetTop &&
        scrollPosition < (aboutRef.current?.offsetTop || Number.MAX_VALUE)
      ) {
        setActiveSection("work")
      } else if (
        aboutRef.current &&
        scrollPosition >= aboutRef.current.offsetTop &&
        scrollPosition < (contactRef.current?.offsetTop || Number.MAX_VALUE)
      ) {
        setActiveSection("about")
      } else if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveSection("connect")
      } else {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "SAMA Health Platform",
      description: "A comprehensive digital healthcare platform built with React, TypeScript, Tailwind CSS, and Node.js/Express",
      category: "Interaction & Development",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Node.js", "MongoDB", "Express"],
    },
    {
      id: 2,
      title: "Bhoomi Pranali",
      description: "A complete land management system for Nepal",
      category: "Full Stack Development",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "D3.js", "Firebase"],
    },
    {
      id: 3,
      title: "Forest Fire Detection",
      description: "A machine learning model to detect forest fires using satellite imagery",
      category: "Machine Learning,AI",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Python", "TensorFlow", "AI", "Flask"],
    },
  ]

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div ref={containerRef} className="relative font-sans">
      <CustomCursor />

      {/* Navigation Bar with Theme Toggle integrated */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopNavigation
          onWorkClick={() => scrollToSection(workRef, "work")}
          onAboutClick={() => scrollToSection(aboutRef, "about")}
          onContactClick={() => scrollToSection(contactRef, "connect")}
          activeSection={activeSection}
        />
      </div>

      {/* Main content */}
      <div className="min-h-screen pt-16 bg-white dark:bg-black">
        {/* Hero Section with Minimalist Design */}
        <section ref={heroRef} className="h-screen flex flex-col items-center justify-center relative px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 text-black dark:text-white">
              hi, i'm{" "}
              <NameHoverEffect>
                <span className="font-bold">dipak</span>
              </NameHoverEffect>
            </h1>

            <div className="flex items-center justify-center text-black dark:text-white mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-base">Kathmandu, Nepal</span>
            </div>

            {/* <p className="text-base sm:text-lg text-black dark:text-white max-w-2xl mx-auto">
              Full-stack developer specializing in creating interactive and dynamic web applications.
            </p> */}
          </motion.div>
        </section>

        {/* Work Section */}
        <section
          ref={workRef}
          className="min-h-[80vh] flex flex-col justify-center py-16 px-4 sm:px-8 md:px-16 lg:px-24"
        >
          <div className="w-full max-w-7xl mx-auto mb-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-2"
            >
              <h2 className="text-sm font-light uppercase tracking-wider text-black dark:text-white">Recent Work</h2>
            </motion.div>
            <div className="h-px w-full bg-gray-300 dark:bg-gray-700 mb-6"></div>
          </div>

          <div className="w-full max-w-7xl mx-auto ">
            {projects.map((project, index) => (
              <WorkItem
                key={project.id}
                id={project.id}
                title={project.title}
                category={project.category}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section
          ref={aboutRef}
          className="min-h-[80vh] flex flex-col justify-center py-16 px-4 sm:px-8 md:px-16 lg:px-24"
        >
          <div className="w-full max-w-7xl mx-auto mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-2"
            >
              <h2 className="text-sm font-light uppercase tracking-wider text-black dark:text-white">About Me</h2>
            </motion.div>
            <div className="h-px w-full bg-gray-300 dark:bg-gray-700 mb-6"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-7xl mx-auto"
          >
            <AboutSection />
          </motion.div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef}
          className="min-h-[80vh] flex flex-col justify-center py-16 px-4 sm:px-8 md:px-16 lg:px-24"
        >
          <div className="w-full max-w-7xl mx-auto mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-2"
            >
              <h2 className="text-sm font-light uppercase tracking-wider text-black dark:text-white">
                Connect With Me
              </h2>
            </motion.div>
            <div className="h-px w-full bg-gray-300 dark:bg-gray-700 mb-6"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-7xl mx-auto"
          >
            <ContactSection />
          </motion.div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
