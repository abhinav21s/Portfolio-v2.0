import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { useMerkleTree } from '../store/merkleStore'
import { shortenHash } from '../utils/merkleTree'

export default function Hero() {
  const { root, isTreeValid } = useMerkleTree()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20 lg:py-0">
      <div className="quiet-grid absolute inset-0 opacity-20" aria-hidden="true" />
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-teal/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-cyan/5 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10 pt-12 md:pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-none"
          >
            <div className="relative w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full p-[1px] bg-gradient-to-tr from-white/20 to-white/5 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-card-darker">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-3 right-3 w-4 h-4 bg-valid-green rounded-full border-2 border-deep-black shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary-teal animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em]">Available for Opportunities</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-text-primary tracking-tight mb-8">
                Building <span className="text-primary-teal italic">verifiable</span> systems.
              </h1>
              
              <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-12 font-light">
                Hi, I'm <span className="text-text-primary font-medium">{personalInfo.name}</span>. {personalInfo.tagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center lg:justify-start gap-6"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 bg-text-primary text-deep-black font-bold rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-primary-teal translate-y-full transition-transform group-hover:translate-y-0" />
              </button>
              <button
                onClick={() => scrollToSection('merkle-tree')}
                className="px-8 py-4 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-text-primary font-bold rounded-full"
              >
                Explore Tree
              </button>
            </motion.div>

            {/* Root Hash Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-8 border-t border-white/5 pt-8"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-mono text-primary-teal">{root ? shortenHash(root.hash, 12) : '...'}</span>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest">Merkle Root Status</span>
              </div>
              <div className="h-8 w-[1px] bg-white/5" />
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isTreeValid ? 'bg-valid-green' : 'bg-invalid-red'} shadow-[0_0_10px_rgba(34,211,238,0.2)]`} />
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                  {isTreeValid ? 'Verified Integrity' : 'Syncing...'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary-teal to-transparent" />
      </motion.div>
    </section>
  )
}
