import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { experience, leadership } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

function ExperienceCard({ item, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pb-12 pl-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute bottom-0 left-0 top-0 w-px bg-primary-teal/25" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 -ml-[7px] h-4 w-4 rounded-full border-4 border-deep-black bg-primary-teal shadow-lg shadow-primary-teal/30" />

      {/* Content */}
      <div className="premium-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-1">
              {item.title}
            </h3>
            <p className="text-primary-teal font-semibold">
              {item.company || item.organization}
            </p>
          </div>
          <span className="px-3 py-1 bg-card-darker border border-primary-teal/30 rounded-full text-sm font-mono text-text-secondary">
            {item.period}
          </span>
        </div>

        <p className="text-text-secondary mb-4 leading-relaxed">
          {item.description}
        </p>

        {item.achievements && (
          <ul className="space-y-2">
            {item.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-3 text-text-secondary text-sm">
                <svg className="w-5 h-5 text-primary-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="section-shell bg-gradient-to-b from-card-dark/20 to-deep-black" ref={ref}>
      <div className="section-divider" />
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="Experience & Leadership"
          description="Building systems, learning quickly, and leading with the consistency developed through athletics."
          isInView={isInView}
        />

        {/* Professional Experience */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3"
          >
            <svg className="w-6 h-6 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Professional Experience
          </motion.h3>
          
          <div>
            {experience.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                item={exp}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3"
          >
            <svg className="w-6 h-6 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Leadership & Athletics
          </motion.h3>
          
          <div>
            {leadership.map((lead, index) => (
              <ExperienceCard
                key={lead.id}
                item={lead}
                index={index + experience.length}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
