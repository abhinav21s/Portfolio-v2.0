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
    <section className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.4) 1px, transparent 0)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-cyan/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Genesis Block Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="inline-block px-6 py-3 bg-card-dark/60 backdrop-blur-sm border border-primary-teal/30 rounded-full text-sm font-mono text-primary-teal shadow-lg shadow-primary-teal/10">
            🌱 Genesis Block
          </span>
        </motion.div>

        {/* Name and Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tight bg-gradient-to-r from-text-primary via-primary-teal to-text-primary bg-clip-text text-transparent"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-3xl text-text-secondary mb-8 font-light tracking-wide"
        >
          {personalInfo.title}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-text-primary/90 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Merkle Root Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <div className={`inline-block px-10 py-8 bg-card-dark/80 backdrop-blur-md border-2 rounded-2xl transition-all duration-500 ${
            isTreeValid 
              ? 'border-primary-teal shadow-2xl shadow-primary-teal/20' 
              : 'border-invalid-red shadow-2xl shadow-invalid-red/20'
          }`}>
            <div className="text-xs text-text-secondary mb-3 font-mono uppercase tracking-widest">
              Merkle Root Hash
            </div>
            <div className={`text-2xl md:text-3xl font-mono font-bold transition-colors duration-500 mb-4 ${
              isTreeValid ? 'text-primary-teal' : 'text-invalid-red'
            }`}>
              {root ? shortenHash(root.hash, 10) : 'Building tree...'}
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                isTreeValid ? 'bg-valid-green animate-pulse' : 'bg-invalid-red animate-pulse'
              }`} />
              <span className="text-sm text-text-secondary font-mono">
                {isTreeValid ? '✓ Valid & Immutable' : '⚠ Invalid - Requires Re-mining'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection('merkle-tree')}
            className="px-10 py-5 bg-gradient-to-r from-primary-teal to-primary-cyan text-deep-black font-bold rounded-xl hover:shadow-2xl hover:shadow-primary-teal/40 transition-all duration-300 hover:scale-105 text-lg"
            aria-label="Explore the Merkle Tree"
          >
            Explore the Tree
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-10 py-5 bg-transparent border-2 border-primary-teal text-primary-teal font-bold rounded-xl hover:bg-primary-teal/10 hover:shadow-xl hover:shadow-primary-teal/20 transition-all duration-300 hover:scale-105 text-lg"
            aria-label="Get in Touch"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
          className="mt-24"
        >
          <div className="flex flex-col items-center gap-3 text-text-secondary/60">
            <span className="text-xs font-mono uppercase tracking-widest">Scroll to explore</span>
            <motion.svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
