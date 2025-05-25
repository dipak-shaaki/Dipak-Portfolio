"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function ContactSection() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    setFormData({ name: "", email: "", organization: "", services: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-black dark:text-white">
              Let's start a<br />
              project
              <br />
              together
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm text-gray-500 dark:text-gray-400">
                  01 — What's your name?
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name *"
                  required
                  className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 text-black dark:text-white bg-transparent focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-sm text-gray-500 dark:text-gray-400">
                  02 — What's your email?
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter you email address *"
                  required
                  className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 text-black dark:text-white bg-transparent focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="services" className="text-sm text-gray-500 dark:text-gray-400">
                  04 — What services are you looking for?
                </label>
                <Input
                  id="services"
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  placeholder="Data analysis, Web Development"
                  className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 text-black dark:text-white bg-transparent focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-sm text-gray-500 dark:text-gray-400">
                  05 — Your message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello Dipak, can you help me with..."
                  rows={4}
                  className="border-0 border-b border-gray-300 dark:border-gray-700 rounded-none px-0 py-2 text-black dark:text-white bg-transparent focus-visible:ring-0 focus-visible:border-primary resize-none"
                />
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 h-auto text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col h-full"
          >
            <div className="mb-6 flex justify-end">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
