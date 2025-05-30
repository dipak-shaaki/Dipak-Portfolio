"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CustomCursor from "@/components/custom-cursor"
// import ThemeToggle from "@/components/theme-toggle"
import Footer from "@/components/footer"
import TopNavigation from "@/components/top-navigation"


// Sample projects data - in a real app, this would come from a database
const projects = [
  {
    id: 1,
    title: "SAMA Health Platform",
    description: "A full-stack e-health solution with payment integration",
    category: "Interaction & Development",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Node.js", "MongoDB", "TypeScript"],
    fullDescription:
      " SAMA Health Platform is a comprehensive digital healthcare platform built with React, TypeScript, Tailwind CSS, and Node.js/Express. It provides a seamless user experience for patients and healthcare providers, allowing them to manage appointments, access medical records, and communicate securely.\n\nThe platform features a responsive design, ensuring accessibility across devices. The backend is powered by Node.js and Express, with MongoDB for data storage. The application also includes payment integration for easy transaction processing.",
    screenshots: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 2,
    title: "Bhoomi Pranali",
    description: "Analytics dashboard for social media management",
    category: "Full Stack Development",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["MongoDB", "nextjs", "javascript"],
    fullDescription:
      "A complete land management system for Nepal, built with React and D3.js. The application provides a user-friendly interface for managing land records, including ownership details, land use, and transaction history.\n\nThe backend is built with mongodb for real-time data synchronization and authentication. The application is designed to be responsive and accessible, ensuring that users can manage land records from any device.",
    screenshots: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 3,
    title: "",
    description: "Forest fire detection ",
    category: "Machine Learning,AI",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Python", "TensorFlow", "React", "Flask"],
    fullDescription:
      "This project is under development and will be available soon. Stay tuned for updates!\n\nForest Fire Detection is a machine learning model designed to detect forest fires using satellite imagery. The project utilizes Python and TensorFlow for model training and prediction, with Flask for the backend API.\n\nThe application processes satellite images to identify patterns indicative of forest fires, providing real-time alerts to prevent potential disasters. The frontend is built with React, offering an intuitive interface for users to upload images and view predictions.",
    screenshots: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
]

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    // Find the project with the matching ID
    const projectId = Number(params.id)
    const foundProject = projects.find((p) => p.id === projectId)

    if (foundProject) {
      setProject(foundProject)
    } else {
      // Redirect to home if project not found
      router.push("/")
    }

    setLoading(false)
  }, [params.id, router])

  const goToHome = () => {
    router.push("/")
  }

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>
  }

  if (!project) {
    return <div className="h-screen flex items-center justify-center">Project not found</div>
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <CustomCursor />
      {/* New Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopNavigation onWorkClick={goToHome} onAboutClick={goToHome} onContactClick={goToHome} activeSection="work" />
      </div>

      <div className="fixed top-6 right-6 z-50">
      
      </div>

      <main className="container mx-auto px-4 py-24">
        <Button variant="ghost" className="mb-8 flex items-center" onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Work
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <p className="text-muted-foreground text-sm mb-6">{project.category}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>

            <div className="prose dark:prose-invert max-w-none">
              {project.fullDescription.split("\n\n").map((paragraph: string, index: number) => (
                <p key={index} className="text-muted-foreground mb-4 text-sm">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-8">Project Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {project.screenshots.map((screenshot: string, index: number) => (
              <div key={index} className="relative h-[200px] sm:h-[250px] rounded-lg overflow-hidden">
                <Image
                  src={screenshot || "/placeholder.svg"}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Add this at the end of your main return, after project details */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/dipak-shaaki/sama-health-platform" // Replace with the correct repo URL for each project
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/200/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
            View Source on GitHub
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
