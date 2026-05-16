import { motion } from 'framer-motion'
import { useMerkleTree } from '../store/merkleStore'
import { shortenHash } from '../utils/merkleTree'
import { personalInfo } from '../data/portfolioData'

export default function Hero() {
  const { root, isTreeValid } = useMerkleTree()

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Genesis Block Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-2 bg-card-dark border border-primary-teal/30 rounded-full text-sm font-mono text-primary-teal">
            Genesis Block
          </span>
        </motion.div>

        {/* Name and Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-text-secondary mb-6 font-light"
        >
          {personalInfo.title}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-text-primary mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Merkle Root Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className={`inline-block px-8 py-6 bg-card-dark border-2 rounded-lg transition-all duration-500 ${
            isTreeValid 
              ? 'border-primary-teal shadow-lg shadow-primary-teal/20' 
              : 'border-invalid-red shadow-lg shadow-invalid-red/20'
          }`}>
            <div className="text-xs text-text-secondary mb-2 font-mono uppercase tracking-wider">
              Merkle Root Hash
            </div>
            <div className={`text-lg md:text-xl font-mono font-semibold transition-colors duration-500 ${
              isTreeValid ? 'text-primary-teal' : 'text-invalid-red'
            }`}>
              {root ? shortenHash(root.hash, 8) : 'Building tree...'}
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                isTreeValid ? 'bg-primary-teal animate-pulse' : 'bg-invalid-red animate-pulse'
              }`} />
              <span className="text-xs text-text-secondary font-mono">
                {isTreeValid ? 'Valid' : 'Invalid - Requires Re-mining'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection('merkle-tree')}
            className="px-8 py-4 bg-primary-teal text-deep-black font-semibold rounded-lg hover:bg-primary-cyan transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-teal/50"
            aria-label="Explore the Merkle Tree"
          >
            Explore the Tree
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 bg-transparent border-2 border-primary-teal text-primary-teal font-semibold rounded-lg hover:bg-primary-teal hover:text-deep-black transition-all duration-300 hover:scale-105"
            aria-label="View Projects"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="mt-20"
        >
          <div className="flex flex-col items-center gap-2 text-text-secondary">
            <span className="text-xs font-mono uppercase tracking-wider">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
