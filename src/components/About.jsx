import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo } from '../data/portfolioData'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary-teal mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Placeholder for photo */}
              <div className="w-full h-full bg-gradient-to-br from-card-dark to-card-darker rounded-2xl border border-primary-teal/20 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary-teal/10 flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-text-secondary text-sm font-mono">
                    Add your photo to<br />public/profile.jpg
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary-teal/30 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-primary-cyan/30 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index} className="text-text-secondary leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="bg-card-dark p-6 rounded-lg border border-primary-teal/20">
                <div className="text-3xl font-bold text-primary-teal mb-2">5+</div>
                <div className="text-sm text-text-secondary">Years Experience</div>
              </div>
              <div className="bg-card-dark p-6 rounded-lg border border-primary-teal/20">
                <div className="text-3xl font-bold text-primary-teal mb-2">20+</div>
                <div className="text-sm text-text-secondary">Projects Completed</div>
              </div>
              <div className="bg-card-dark p-6 rounded-lg border border-primary-teal/20">
                <div className="text-3xl font-bold text-primary-teal mb-2">10+</div>
                <div className="text-sm text-text-secondary">Smart Contracts</div>
              </div>
              <div className="bg-card-dark p-6 rounded-lg border border-primary-teal/20">
                <div className="text-3xl font-bold text-primary-teal mb-2">99.9%</div>
                <div className="text-sm text-text-secondary">Uptime Record</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
