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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card-dark border border-primary-teal/20 rounded-lg overflow-hidden hover:border-primary-teal/40 transition-all duration-300"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-card-darker/50 transition-colors duration-200"
        aria-expanded={isExpanded}
        aria-label={`Toggle ${title} skills`}
      >
        <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5 text-primary-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pt-2">
          <div className="flex flex-wrap gap-2">
            {items.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isExpanded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                className="px-4 py-2 bg-card-darker border border-primary-teal/30 rounded-full text-sm text-text-secondary hover:text-primary-teal hover:border-primary-teal hover:bg-primary-teal/10 transition-all duration-200 cursor-default"
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
    <section id="skills" className="py-32 px-6 bg-gradient-to-b from-deep-black to-card-dark/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical Branches
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Each skill is a branch in the tree, contributing to the overall strength of the system.
          </p>
          <div className="w-20 h-1 bg-primary-teal mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
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
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card-dark border border-primary-teal/30 rounded-full">
            <div className="w-2 h-2 bg-primary-teal rounded-full animate-pulse" />
            <span className="text-sm font-mono text-text-secondary">
              All branches connect to the root
            </span>
            <div className="w-2 h-2 bg-primary-teal rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
