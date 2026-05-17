import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { beyondTheChain } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

function HobbyCard({ hobby, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="premium-card group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40"
    >
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {hobby.icon}
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-3">
        {hobby.title}
      </h3>
      <p className="text-text-secondary leading-relaxed">
        {hobby.description}
      </p>
    </motion.div>
  )
}

export default function BeyondTheChain() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="beyond" className="section-shell bg-deep-black" ref={ref}>
      <div className="section-divider" />
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Beyond"
          title="Beyond the Chain"
          description="Off-screen habits that keep the engineering process balanced, precise, and sustainable."
          isInView={isInView}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beyondTheChain.map((hobby, index) => (
            <HobbyCard
              key={hobby.id}
              hobby={hobby}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="premium-card mx-auto max-w-3xl rounded-2xl border-l-4 border-l-primary-teal p-8">
            <p className="text-xl text-text-primary italic mb-4">
              "Excellence is not a destination; it's a continuous journey that requires discipline, patience, and the courage to keep improving."
            </p>
            <p className="text-text-secondary">
              — A lesson from the track that applies to every line of code
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
