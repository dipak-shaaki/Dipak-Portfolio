"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileDown, Code2, Brain, BookOpen, Target } from "lucide-react"
import Link from "next/link"

export default function AboutSection() {
  const highlights = [
    { icon: <Code2 className="h-5 w-5" />, text: "MERN Stack Developer" },
    { icon: <Brain className="h-5 w-5" />, text: "AI/ML Enthusiast" },
    { icon: <BookOpen className="h-5 w-5" />, text: "Quick Learner" },
    { icon: <Target className="h-5 w-5" />, text: "Problem Solver" },
  ]

  const skills = [
    {
      category: "Frontend",
      technologies: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express.js", "MongoDB", "RESTful APIs"],
    },
    {
      category: "AI/ML & Data",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"],
    },
    {
      category: "Tools",
      technologies: ["Git", "GitHub", "VS Code", "Postman", "Jupyter"],
    },
  ]

  return (
    <div className="w-full">
      {/* Introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-black dark:text-white">
            Fresh Perspective, Endless Possibilities
          </h3>
          <p className="text-base mb-4 text-black dark:text-white leading-relaxed">
            I'm a passionate fresher from Kathmandu, Nepal, with strong knowledge in MERN stack development. My
            enthusiasm for technology drives me to create innovative solutions and explore the exciting world of AI/ML
            and Data Science.
          </p>
          <p className="text-base mb-6 text-black dark:text-white leading-relaxed">
            Ready to contribute fresh ideas and modern approaches while continuously learning and growing as a
            developer.
          </p>
          <Link href="/resume">
            <Button className="flex items-center gap-2 text-sm">
              <FileDown className="h-4 w-4" />
              View Resume
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="text-primary mr-3">{highlight.icon}</div>
              <span className="text-black dark:text-white font-medium">{highlight.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Skills & Technologies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Technical Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary/50 transition-colors"
            >
              <h4 className="text-base font-bold mb-2 text-black dark:text-white">{skill.category}</h4>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
