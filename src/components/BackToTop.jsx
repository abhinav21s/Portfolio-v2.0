import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          whileHover={{ y: -2 }}
          onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-xl border border-primary-teal/30 bg-card-dark/90 text-primary-teal shadow-2xl shadow-black/30 backdrop-blur-md transition-colors hover:border-primary-teal hover:bg-primary-teal hover:text-deep-black sm:bottom-8 sm:right-8"
          aria-label="Back to top"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
