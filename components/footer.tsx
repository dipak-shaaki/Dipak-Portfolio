"use client"

import { motion } from "framer-motion"
import { Github, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-gray-100 dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* Social Icons */}
          <div className="flex justify-center space-x-8 mb-8">
            <Link
              href="https://github.com/dipak-shaaki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white hover:opacity-70 transition-opacity"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/dipak-shanki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white hover:opacity-70 transition-opacity"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://www.instagram.com/dipak.shaki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white hover:opacity-70 transition-opacity"
            >
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-black dark:text-white text-center">
            Copyright © {new Date().getFullYear()}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
