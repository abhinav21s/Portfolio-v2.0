import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { skills } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

function SkillCategory({ title, items, index, isInView }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="premium-card overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary-teal/40"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors duration-300 hover:bg-white/[0.03] sm:px-7"
        aria-expanded={isExpanded}
        aria-label={`Toggle ${title} skills`}
      >
        <h3 className="text-xl font-bold text-text-primary transition-colors duration-300 group-hover:text-primary-teal sm:text-2xl">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-primary-teal/20 bg-primary-teal/10 transition-colors duration-300 group-hover:bg-primary-teal/20"
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
        <div className="px-6 pb-7 pt-1 sm:px-7">
          <div className="flex flex-wrap gap-2.5">
            {items.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isExpanded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="cursor-default rounded-lg border border-primary-teal/20 bg-card-darker/70 px-4 py-2.5 text-sm text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-teal/50 hover:bg-primary-teal/10 hover:text-primary-teal"
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
    <section id="skills" className="section-shell relative overflow-hidden bg-gradient-to-b from-card-darker/20 via-deep-black to-deep-black" ref={ref}>
      <div className="section-divider" />
      <div className="quiet-grid absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Technical Stack"
          title="Technical Branches"
          description="A focused toolkit for building reliable APIs, responsive interfaces, and verifiable blockchain experiences."
          isInView={isInView}
        />

        <div className="mb-14 grid gap-5 md:grid-cols-2">
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
          <div className="inline-flex items-center gap-4 rounded-2xl border border-primary-teal/25 bg-card-dark/70 px-6 py-4 backdrop-blur-md">
            <div className="h-2.5 w-2.5 rounded-full bg-primary-teal" />
            <span className="text-sm font-mono text-text-secondary">
              All branches connect to the root
            </span>
            <div className="h-2.5 w-2.5 rounded-full bg-primary-cyan" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
