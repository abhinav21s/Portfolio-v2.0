import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { skills } from '../data/portfolioData'

function SkillCategory({ title, items, index, isInView }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card-dark/60 backdrop-blur-sm border border-primary-teal/20 rounded-2xl overflow-hidden hover:border-primary-teal/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary-teal/10"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-card-darker/50 transition-colors duration-300 group"
        aria-expanded={isExpanded}
        aria-label={`Toggle ${title} skills`}
      >
        <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary-teal transition-colors duration-300">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-10 h-10 bg-primary-teal/10 rounded-xl flex items-center justify-center group-hover:bg-primary-teal/20 transition-colors duration-300"
        >
          <svg className="w-6 h-6 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-8 pt-2">
          <div className="flex flex-wrap gap-3">
            {items.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isExpanded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="px-5 py-3 bg-card-darker/80 border border-primary-teal/30 rounded-xl text-sm text-text-secondary hover:text-primary-teal hover:border-primary-teal hover:bg-primary-teal/10 transition-all duration-300 cursor-default hover:scale-105 hover:shadow-lg hover:shadow-primary-teal/20"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    { title: skills.backend.title, items: skills.backend.items },
    { title: skills.blockchain.title, items: skills.blockchain.items },
    { title: skills.frontend.title, items: skills.frontend.items },
    { title: skills.tools.title, items: skills.tools.items },
  ]

  return (
    <section id="skills" className="py-40 px-6 bg-gradient-to-b from-card-darker/20 via-deep-black to-deep-black relative overflow-hidden" ref={ref}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
              Technical Arsenal
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Technical Branches
          </h2>
          
          <p className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Each skill is a branch in the tree, contributing to the overall strength and integrity of the system.
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary-teal to-transparent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              items={category.items}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Visual Connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-card-dark/60 backdrop-blur-sm border border-primary-teal/30 rounded-2xl">
            <div className="w-3 h-3 bg-primary-teal rounded-full animate-pulse" />
            <span className="text-sm font-mono text-text-secondary">
              All branches connect to the root
            </span>
            <div className="w-3 h-3 bg-primary-cyan rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
