"use client"

import { motion } from "framer-motion"
import { Github, Instagram, Linkedin } from "lucide-react"

export default function SocialIcons() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://linkedin.com",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex space-x-3"
    >
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:bg-primary/10 hover:border-primary transition-all duration-200 transform hover:scale-110"
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </motion.div>
  )
}
