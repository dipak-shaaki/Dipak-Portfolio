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
    <div className="min-h-screen relative">
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
      </main>

      <Footer />
    </div>
  )
}
