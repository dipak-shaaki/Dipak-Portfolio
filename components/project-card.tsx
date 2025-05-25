"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  fullDescription?: string
  screenshots?: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="project-card h-full"
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative h-40 overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
              transition: { duration: 0.5 },
            }}
            className="w-full h-full"
          >
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </motion.div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-base font-bold mb-1">{project.title}</h3>
          <p className="text-muted-foreground mb-3 text-xs">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
