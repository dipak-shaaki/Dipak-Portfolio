'use client'

import { useEffect } from 'react'

export default function SiteProtection() {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
            return false
        }

        // Disable F12 key
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12 key
            if (e.key === 'F12') {
                e.preventDefault()
                return false
            }

            // Ctrl+Shift+I (Developer Tools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault()
                return false
            }

            // Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault()
                return false
            }

            // Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault()
                return false
            }

            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault()
                return false
            }

            // Ctrl+Shift+U (View Source)
            if (e.ctrlKey && e.shiftKey && e.key === 'U') {
                e.preventDefault()
                return false
            }
        }

        // Disable developer tools shortcuts
        const handleKeyUp = (e: KeyboardEvent) => {
            // F12 key
            if (e.key === 'F12') {
                e.preventDefault()
                return false
            }
        }

        // Add event listeners
        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        // Cleanup function
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return null // This component doesn't render anything
}
