"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ResumePage() {
  const router = useRouter()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    // Simulate PDF generation/download
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would generate and download the PDF here
    // For now, we'll just simulate the download
    const link = document.createElement("a")
    link.href = "/placeholder.pdf" // Replace with actual PDF path
    link.download = "Dipak_Resume.pdf"
    link.click()

    setIsDownloading(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
          <Button onClick={handleDownload} disabled={isDownloading} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 border border-gray-200 dark:border-gray-800"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Dipak Shanki</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Full Stack Developer</p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                dipak@example.com
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                +977 98XXXXXXXX
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Kathmandu, Nepal
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <Link href="https://github.com" className="flex items-center text-primary hover:underline">
                <Github className="h-4 w-4 mr-1" />
                GitHub
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
              <Link href="https://linkedin.com" className="flex items-center text-primary hover:underline">
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Passionate and motivated fresh graduate with strong knowledge in MERN stack development. Enthusiastic
              about creating innovative web applications and exploring AI/ML technologies. Quick learner with excellent
              problem-solving skills and a dedication to writing clean, efficient code.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Frontend Development</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  React, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Backend Development</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Node.js, Express.js, MongoDB, RESTful APIs</p>
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">AI/ML & Data Science</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Python, Pandas, NumPy, Scikit-learn, TensorFlow
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Tools & Technologies</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Git, GitHub, VS Code, Postman, Jupyter Notebook
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Education
            </h2>
            <div className="mb-4">
              <h3 className="font-semibold text-black dark:text-white">Bachelor's Degree in Computer Science</h3>
              <p className="text-gray-600 dark:text-gray-400">University Name • 2020 - 2024</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                Relevant coursework: Data Structures, Algorithms, Database Management, Web Development
              </p>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Projects
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-black dark:text-white">E-Commerce Platform</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">MERN Stack • Personal Project</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  Full-stack e-commerce application with user authentication, product catalog, and payment integration.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white">Data Analysis Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Python, Pandas • Academic Project</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  Interactive dashboard for data visualization and analysis using Python and machine learning
                  algorithms.
                </p>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Certifications
            </h2>
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-black dark:text-white">Full Stack Web Development</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Online Course Platform • 2024</p>
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white">Introduction to Machine Learning</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Coursera • 2024</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
