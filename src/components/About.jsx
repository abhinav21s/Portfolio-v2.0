import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo } from '../data/portfolioData'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-40 px-6 bg-gradient-to-b from-deep-black to-card-darker/20" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-primary-teal/10 border border-primary-teal/30 rounded-full text-sm font-mono text-primary-teal backdrop-blur-sm">
              Background
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary-teal to-transparent mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Placeholder for photo */}
              <div className="w-full h-full bg-gradient-to-br from-card-dark/80 to-card-darker/80 backdrop-blur-sm rounded-3xl border-2 border-primary-teal/20 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="text-center p-12">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-teal/20 to-primary-cyan/20 flex items-center justify-center">
                    <svg className="w-20 h-20 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-text-secondary text-sm font-mono leading-relaxed">
                    Add your professional photo to<br />
                    <span className="text-primary-teal">public/profile.jpg</span>
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-primary-teal/20 rounded-3xl -z-10 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-primary-cyan/20 rounded-3xl -z-10" style={{ animationDelay: '1s' }} />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-primary-cyan/5 rounded-3xl -z-20 blur-2xl" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            {personalInfo.bio.map((paragraph, index) => (
              <motion.p 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-text-secondary leading-relaxed text-lg"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 gap-5 pt-8"
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
                  className="bg-card-dark/60 backdrop-blur-sm p-6 rounded-xl border border-primary-teal/20 hover:border-primary-teal/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary-teal/10 group"
                >
                  <div className="text-4xl font-bold text-primary-teal mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary font-medium">
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
