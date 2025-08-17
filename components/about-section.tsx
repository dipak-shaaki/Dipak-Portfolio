"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileDown, Code2, Brain, BookOpen, Target } from "lucide-react"
import Link from "next/link"

export default function AboutSection() {
  const highlights = [
    { icon: <Code2 className="h-5 w-5" />, text: "MERN Stack" },
    { icon: <Brain className="h-5 w-5" />, text: "AI/ML Enthusiast" },
    // { icon: <BookOpen className="h-5 w-5" />, text: "Quick Learner" },
    // { icon: <Target className="h-5 w-5" />, text: "Problem Solver" },
  ]

  const skills = [
    {
      category: "Frontend",
      technologies: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express.js", "MongoDB", "POSTGRESQL","RESTful APIs"],
    },
    {
      category: "AI/ML & Data",
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib","Scikit-learn", "TensorFlow"],
    },
    {
      category: "Tools",
      technologies: ["Git", "GitHub", "VS Code", "Postman", "Jupyter Notebook"],
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
        
          <p className="text-base mb-4 text-black dark:text-white leading-relaxed">
         Learning and building full-stack web applications with a focus on the MERN stack.
         Passionate about AI/ML and data science.
           <br /> 
         Right now, looking for an   <b style={{color: "black",fontSize: "1.2rem"}}>INTERNSHIP!</b> </p>
        
          {/* <Link href="/resume">
            <Button className="flex items-center gap-2 text-sm">
              <FileDown className="h-4 w-4" />
            Resume
            </Button>
          </Link> */}
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
