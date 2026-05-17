import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="section-shell bg-gradient-to-b from-deep-black to-card-darker/20" ref={ref}>
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Background"
          title="About Me"
          description="I build practical, resilient software with a strong backend foundation and a growing Web3 toolkit."
          isInView={isInView}
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="premium-card relative mx-auto max-w-md overflow-hidden rounded-2xl p-3">
              <div className="aspect-[4/5] overflow-hidden rounded-xl">
                <img
                  src={personalInfo.photo}
                  alt={`${personalInfo.name} profile`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-deep-black/75 p-4 backdrop-blur-md">
                <p className="text-sm leading-6 text-text-secondary">
                  Backend-first engineer with a disciplined product mindset and strong attention to interface quality.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-7"
          >
            {personalInfo.bio.map((paragraph, index) => (
              <motion.p 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-lg leading-8 text-text-secondary"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4"
            >
              {[
                { value: '5+', label: 'Years Experience', delay: 0 },
                { value: '20+', label: 'Projects Completed', delay: 0.1 },
                { value: '10+', label: 'Smart Contracts', delay: 0.2 },
                { value: '99.9%', label: 'Uptime Record', delay: 0.3 }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + stat.delay }}
                  className="premium-card group rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40"
                >
                  <div className="mb-2 text-3xl font-bold text-primary-teal transition-transform duration-300 group-hover:scale-105">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium leading-5 text-text-secondary">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
