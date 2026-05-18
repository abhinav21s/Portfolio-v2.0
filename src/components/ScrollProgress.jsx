import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-primary-teal to-primary-cyan progress-glow"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
