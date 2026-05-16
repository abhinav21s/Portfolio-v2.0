import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { beyondTheChain } from '../data/portfolioData'

function HobbyCard({ hobby, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card-dark border border-primary-teal/20 rounded-lg p-6 hover:border-primary-teal/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary-teal/10 group"
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
    <section id="beyond" className="py-32 px-6 bg-deep-black" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Beyond the Chain
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Off-chain activities that strengthen on-chain performance. Life is about balance, discipline, and continuous growth.
          </p>
          <div className="w-20 h-1 bg-primary-teal mx-auto mt-6" />
        </motion.div>

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
          <div className="max-w-3xl mx-auto p-8 bg-card-dark border-l-4 border-primary-teal rounded-lg">
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
