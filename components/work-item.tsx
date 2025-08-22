"use client"

import { motion } from "framer-motion"

interface WorkItemProps {
  id: number
  title: string
  category: string
  index: number
}

export default function WorkItem({ id, title, category, index }: WorkItemProps) {
  // GitHub repository URLs for each project
  const githubUrls = {
    1: "https://github.com/dipak-shaaki/SAMA-Final",
    2: "https://github.com/dipak-shaaki/bhoomi-pranali", 
    3: "https://github.com/dipak-shaaki/Forest_Fire_Prediction", 
  }

  const handleClick = () => {
    const url = githubUrls[id as keyof typeof githubUrls]
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="block py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-black dark:text-white mt-2 sm:mt-0">{category}</p>
        </div>
      </div>
      <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
    </motion.div>
  )
}
