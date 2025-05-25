"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        {/* Loader Image */}
        <div className="mb-6">
          <Image
            src="../images/loader.png"
            alt="Loading..."
            width={350}
            height={400}
          />
        </div>
      </motion.div>
    </div>
  )
}
